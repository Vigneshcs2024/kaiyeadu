import config from 'config';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';

import { logger } from '$api/tools';
import * as authRepository from './auth.repository';
import { validateLogin } from './auth.validation';

const JWT_SECRET = (config.get('keys.jwt.secret') ?? process.env.JWT_SECRET) as string;

export async function getLoginPassword(req: Request, res: Response) {
	const { gpf } = req.body;

	// todo: add size validation
	await Joi.string().alphanum().required().validateAsync(gpf);

	const { user, loginPassword } = await authRepository.createLoginPassword(gpf);

	// todo: send email/ sms
	logger.debug(`User ${user.gpf} has been given a new login password: ${loginPassword}`);

	res.status(StatusCodes.OK).json({
		message: 'Login password has been sent to user'
	});
}

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	await validateLogin({ email, password });
	const { id, name, designation, role } = await authRepository.login({ email, password });

	const payload: PayloadObject = { id, name, designation, role };
	const token = jwt.sign(payload, JWT_SECRET, { issuer: 'TNPOL', expiresIn: '1h' });

	res.status(StatusCodes.CREATED).json({ message: 'Login successful', token });
}

export async function resetPassword(req: Request, res: Response) {
	const { email } = req.body;

	await Joi.string().email().required().validateAsync(email);
	const { user, resetOtp } = await authRepository.resetPassword(email);

	// todo: send email / sms
	logger.debug(`User ${user.email} has been given a new temporary password: ${resetOtp}`);

	res.status(StatusCodes.OK).json({
		message: 'Use the temporary password sent to your email to login and change your password'
	});
}
