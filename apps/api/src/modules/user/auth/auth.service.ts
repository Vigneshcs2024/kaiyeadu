import config from 'config';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';

import * as authRepository from './auth.repository';
import { validateLogin } from './auth.validation';

const JWT_SECRET = (config.get('keys.jwt.secret') ?? process.env.JWT_SECRET) as string;

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	await validateLogin({ email, password });
	const { id, name, designation, role } = await authRepository.login({ email, password });

	const payload: PayloadObject = { id, name, designation, role };
	const token = jwt.sign(payload, JWT_SECRET, { issuer: 'TNPOL', expiresIn: '1h' });

	res.status(StatusCodes.CREATED).json({ message: 'Login successful', token });
}
