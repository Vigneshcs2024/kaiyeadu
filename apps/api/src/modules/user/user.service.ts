import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { ClientError } from '$api/errors';

import * as userRepository from './user.repository';
import { validateCreateUser } from './user.validation';

export async function createUser(req: ApiRequest, res: Response) {
	if (req.user.role === 'admin' && req.body.role !== 'user') {
		throw new ClientError(
			'Admins are privileged to create only users',
			StatusCodes.BAD_REQUEST
		);
	}

	const { name, email, phone, police_station, password, designation, role } = req.body;
	const userDetails = { name, email, phone, police_station, password, designation, role };

	await validateCreateUser(userDetails);
	const user = await userRepository.createUser(userDetails);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'User was created', result: { id: user.id } });
}

export async function listUsers(req: ApiRequest, res: Response) {
	const { pageNumber, resultsPerPage } = req.query;

	const users = await userRepository.listUsers({
		pageNumber: +pageNumber || 1,
		resultsPerPage: +resultsPerPage || 10
	});

	return res.json({ message: 'Users fetched successfully', result: users });
}
