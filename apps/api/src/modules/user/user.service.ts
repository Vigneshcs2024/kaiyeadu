import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UpdatePasswordDto, UpdateUserDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { ApiRequest } from '$api/types';
import { logger } from '$api/tools';
import { jsonPrettyPrint } from '$api/utilities';
import { validateUUID } from '$api/utilities/validations';

import * as userRepository from './user.repository';
import {
	validateCreateUser,
	validateListUsers,
	validateUpdatePassword,
	validateUpdateUser
} from './user.validation';

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
	const mp = new URLSearchParams(new URL(`http://[::1]/${req.url}`).search);
	const options = {
		count: +mp.get('count') || 10,
		page: +mp.get('page') || 1,
		f: JSON.parse(mp.get('f')) ?? {},
		q: mp.get('q') ?? '',
		s: JSON.parse(mp.get('s')) ?? { key: 'name', order: 'ASC' }
	};

	logger.debug(jsonPrettyPrint(options));

	await validateListUsers(options);

	const result = await userRepository.listUsers({
		params: {
			search: options.q,
			filters: options.f,
			sort: options.s
		},
		pagination: {
			pageNumber: options.page,
			resultsPerPage: options.count
		}
	});

	return res.json({ message: 'Users fetched successfully', result });
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
	await validateUpdateUser(userDetails);

	await userRepository.updateUser(id, userDetails);

	res.status(StatusCodes.OK).json({ message: 'User updated successfully', result: { id } });
}

export async function removeUser(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await userRepository.remove(id);

	res.status(StatusCodes.OK).json({ message: 'User removed successfully' });
}
