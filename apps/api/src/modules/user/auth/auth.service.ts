import config from 'config';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';

import * as authRepository from './auth.repository';
import { validateLogin } from './auth.validation';
import Joi from 'joi';
import { logger } from '$api/tools';

const JWT_SECRET = (config.get('keys.jwt.secret') ?? process.env.JWT_SECRET) as string;

export async function getLoginPassword(req: Request, res: Response) {
	const { gpf } = req.body;

	// todo: add size validation
	Joi.string().alphanum().validate(gpf);

	const { user, loginPassword } = await authRepository.createLoginPassword(gpf);

	// todo: send email/ sms
	logger.debug(`User ${user.gpf} has been given a new login password: ${loginPassword}`);

	return res.status(StatusCodes.OK).json({
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
