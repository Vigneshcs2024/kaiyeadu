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

const JWT_SECRET = (config.get('keys.jwt.secret') ?? process.env.JWT_SECRET) as string;

export async function getLoginPassword(req: Request, res: Response) {
	const { gpf } = req.body;

	await Joi.string().alphanum().min(10).max(10).required().validateAsync(gpf);

	const { user, loginPassword } = await authRepository.createLoginPassword(gpf);

	await sendEmail(
		user.email,
		'Kaiyeadu - Login Password',
		`Your login password is ${loginPassword}`
	);

	await sendSms(`+91${user.phone}`, `Your Kaiyeadu login password is: ${loginPassword}`);

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

	res.status(StatusCodes.CREATED).json({
		message: 'Login successful',
		token,
		isResetPassword
	});
}

export async function loginWithGPF(req: Request, res: Response) {
	const { gpf, password } = req.body;

	await validateLoginWithGPF({ gpf, password });
	const { id, name, designation, role } = await authRepository.login({ gpf, password });

	const payload: PayloadObject = { id, name, designation, role };
	const token = jwt.sign(payload, JWT_SECRET, { issuer: 'TNPOL', expiresIn: '1d' });

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

	res.status(StatusCodes.OK).json({
		message: 'Use the temporary password sent to your email to login and change your password'
	});
}
