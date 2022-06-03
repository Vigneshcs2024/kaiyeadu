import config from 'config';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import pc from 'picocolors';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';
import { logger } from '$api/tools';
import { sendEmail, sendSms } from '$api/root/connections';

import * as authRepository from './auth.repository';
import { validateLogin, validateLoginWithGPF } from './auth.validation';
import { accessLogger } from '$api/tools/access-logger';
import { ApiRequest } from '$api/types';

const JWT_SECRET = (config.get('keys.jwt.secret') ?? process.env.JWT_SECRET) as string;

export async function getLoginPassword(req: Request, res: Response) {
	const { gpf } = req.body;

	const { user, loginPassword } = await authRepository.createLoginPassword(gpf);

	try {
		await sendEmail(
			user.email,
			'Kaiyeadu - Login Password',
			`Your login password is ${loginPassword}`
		);

		await sendSms(`+91${user.phone}`, `Your Kaiyeadu login password is: ${loginPassword}`);
	} catch (error) {
		logger.warn((error as Error).stack);
	}

	logger.debug(
		`User ${user.gpf} has been given a new login password: ${pc.yellow(loginPassword)}`
	);

	res.status(StatusCodes.OK).json({
		message: 'Login password has been sent to user'
	});
}

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	await validateLogin({ email, password });
	const { id, name, designation, role } = await authRepository.login({ email, password });

	const isResetPassword = role !== 'user' && !isNaN(password);

	const payload: PayloadObject = { id, name, designation, role };
	const token = jwt.sign(payload, JWT_SECRET, {
		issuer: 'TNPOL',
		expiresIn: isResetPassword ? '15m' : '1d'
	});

	// accessLogger(req, `User - ${name} has logged in`);

	res.status(StatusCodes.CREATED).json({
		message: 'Login successful',
		token,
		isResetPassword
	});
}

export async function loginWithGPF(req: ApiRequest, res: Response) {
	const { gpf, password } = req.body;

	await validateLoginWithGPF({ gpf, password });
	const { id, name, designation, role } = await authRepository.login({ gpf, password });

	// For Access Log purpose only
	req.user = {
		id,
		name,
		designation,
		role
	};

	const payload: PayloadObject = { id, name, designation, role };
	const token = jwt.sign(payload, JWT_SECRET, { issuer: 'TNPOL', expiresIn: '1d' });

	accessLogger(req, `User with GPF ID: ${gpf} has logged in`);

	res.status(StatusCodes.CREATED).json({
		message: 'Login successful',
		token,
		isResetPassword: role !== 'user' && !isNaN(password)
	});
}

export async function resetPassword(req: Request, res: Response) {
	const { email } = req.body;

	await Joi.string().email().required().validateAsync(email);
	const { user, resetValue } = await authRepository.resetPassword(email);

	const msg = `Your Kaiyeadu temporary password is: ${resetValue}`;

	await sendEmail(email, 'Reset Password', msg);

	await sendSms(`+91${user.phone}`, msg);

	logger.debug(
		`User ${user.email} has been given a new temporary password: ${pc.yellow(resetValue)}`
	);

	accessLogger(
		req,
		`Temporary password has been sent to user ${user.name} with email: ${user.email} for password reset`
	);

	res.status(StatusCodes.OK).json({
		message: 'Use the temporary password sent to your email to login and change your password'
	});
}
