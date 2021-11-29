import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from 'config';
import jwt from 'jsonwebtoken';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';
import { ClientError } from '$api/errors';

import * as authRepository from './auth.repository';

const JWT_SECRET = (config.get('keys.jwt.secret') ?? process.env.JWT_SECRET) as string;

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	if (!email || !password)
		throw new ClientError('Email and password are required', StatusCodes.BAD_REQUEST);

	const { id, name, designation, role } = await authRepository.login({ email, password });

	const payload: PayloadObject = { id, name, designation, role };
	const token = jwt.sign(payload, JWT_SECRET, { issuer: 'TNPOL', expiresIn: '1h' });

	res.status(StatusCodes.CREATED).json({ message: 'Login successful', token });
}
