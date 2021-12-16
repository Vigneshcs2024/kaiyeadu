import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { ClientError } from '$api/errors';

import { UpdatePasswordDto, UpdateUserDto } from '@kaiyeadu/api-interfaces/dtos';
import * as userRepository from './user.repository';
import { validateCreateUser, validateUpdatePassword, validateUpdateUser } from './user.validation';
import { logger } from '$api/tools';
import { jsonPrettyPrint } from '$api/utilities';

export async function createUser(req: ApiRequest, res: Response) {
	if (req.user.role === 'admin' && req.body.role !== 'user') {
		throw new ClientError(
			'Admins are privileged to create only users',
			StatusCodes.BAD_REQUEST
		);
	}

	if (req.body.role === 'user') {
		if (!req.body.gpf) {
			throw new ClientError('Standard users need a GPF number ', StatusCodes.BAD_REQUEST);
		}
		if (req.body.password) {
			throw new ClientError('Standard users cannot have a password', StatusCodes.BAD_REQUEST);
		}
	}

	const { name, email, gpf, phone, police_station, password, designation, role } = req.body;
	const userDetails = {
		name,
		email,
		gpf,
		phone: +phone,
		police_station,
		password,
		designation,
		role
	};

	await validateCreateUser(userDetails);
	const user = await userRepository.createUser(userDetails);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'User was created', result: { id: user.id } });
}

export async function listUsers(req: ApiRequest, res: Response) {
	const mp = new URLSearchParams(req.url);
	const options = {
		count: +mp.get('count'),
		page: +mp.get('page'),
		f: JSON.parse(mp.get('f')),
		q: mp.get('q'),
		s: JSON.parse(mp.get('s'))
	};

	logger.debug(jsonPrettyPrint(options));

	const users = await userRepository.listUsers({
		params: {
			search: options.q,
			filters: options.f ?? [],
			sort: options.s ?? { key: 'name', order: 'asc' }
		},
		pagination: {
			pageNumber: options.page || 1,
			resultsPerPage: options.count || 10
		}
	});

	return res.json({ message: 'Users fetched successfully', result: users });
}

export async function updatePassword(req: ApiRequest, res: Response) {
	const { id: userId } = req.user;
	const { currentPassword, newPassword }: UpdatePasswordDto = req.body;

	await validateUpdatePassword({ currentPassword, newPassword });
	await userRepository.updatePassword(userId, { currentPassword, newPassword });

	res.status(StatusCodes.OK).json({ message: 'Password updated successfully' });
}

export async function getUser(req: ApiRequest, res: Response) {
	const { id } = req.params;

	const user = await userRepository.getUser(id);

	return res.json({ message: 'User fetched successfully', result: user });
}

export async function updateUser(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { name, email, phone, police_station, designation, role, gpf }: UpdateUserDto = req.body;
	const userDetails = { name, email, phone: +phone, police_station, designation, role, gpf };

	logger.debug(jsonPrettyPrint(userDetails));
	// todo: check validations
	validateUpdateUser(userDetails);

	await userRepository.updateUser(id, userDetails);

	res.status(StatusCodes.OK).json({ message: 'User updated successfully', result: { id } });
}
