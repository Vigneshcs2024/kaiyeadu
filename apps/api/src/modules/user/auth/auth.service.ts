import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '$api/errors';

import * as authRepository from './auth.repository';

export async function login(req: Request, res: Response) {
	const { email, password } = req.body;

	if (!email || !password)
		throw new ClientError('Email and password are required', StatusCodes.BAD_REQUEST);

	const user = await authRepository.login({ email, password });
	res.status(StatusCodes.OK).json(user);
}
