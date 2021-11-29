import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { ClientError } from '$api/errors';

import * as userRepository from './user.repository';

export async function createUser(req: ApiRequest, res: Response) {
	if (req.user.role === 'user') {
		throw new ClientError(
			'Not enough privileges to perform this action',
			StatusCodes.FORBIDDEN
		);
	}

	if (req.user.role === 'admin' && req.body.role !== 'user') {
		throw new ClientError(
			'Admins are privileged to create only users',
			StatusCodes.BAD_REQUEST
		);
	}

	const { name, email, phone, police_station, password, designation, role } = req.body;

	// todo: add JOI validation

	const user = await userRepository.createUser({
		name,
		email,
		phone,
		police_station,
		password,
		designation,
		role
	});

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'User was created', result: { id: user.id } });
}
