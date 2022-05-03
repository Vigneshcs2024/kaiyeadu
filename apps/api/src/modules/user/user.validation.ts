import Joi from 'joi';

import {
	CreateUserDto,
	ListUsersDto,
	UpdatePasswordDto,
	UpdateUserDto
} from '@kaiyeadu/api-interfaces/dtos';
import { designations, roles } from '@kaiyeadu/api-interfaces/constants';

export function validateCreateUser(userDetails: CreateUserDto) {
	const schema = Joi.object<CreateUserDto>({
		name: Joi.string().min(3).max(30).required(),
		gpf: Joi.string().alphanum().min(10).max(10).required(),
		email: Joi.string().email().required(),
		phone: Joi.number().min(4_444_444_444).max(9_999_999_999).required(),
		password: Joi.string().min(8).max(30),
		police_station: Joi.string().min(36).max(36).required().messages({
			'string.min': `'police_station' must be a valid uuid`,
			'string.max': `'police_station' must be a valid uuid`
		}),
		designation: Joi.string()
			.min(3)
			.max(30)
			.valid(...designations)
			.required(),
		role: Joi.valid(...roles).required()
	});

	return schema.validateAsync(userDetails);
}

export function validateUpdatePassword(userDetails: UpdatePasswordDto) {
	const schema = Joi.object<UpdatePasswordDto>({
		currentPassword: Joi.string().min(8).max(30),
		newPassword: Joi.string().min(8).max(30)
	});

	return schema.validateAsync(userDetails);
}

export function validateUpdateUser(userDetails: UpdateUserDto) {
	const schema = Joi.object<CreateUserDto>({
		name: Joi.string().min(3).max(30),
		gpf: Joi.string().alphanum().min(10).max(10),
		email: Joi.string().email(),
		phone: Joi.number().min(4_444_444_444).max(9_999_999_999),
		password: Joi.string().min(8).max(30),
		police_station: Joi.string().uuid({ version: 'uuidv4' }).messages({
			'string.min': `'police_station' must be a valid uuid`,
			'string.max': `'police_station' must be a valid uuid`
		}),
		designation: Joi.string().min(3).max(30),
		role: Joi.valid(...roles)
	});

	return schema.validateAsync(userDetails);
}

export function validateListUsers(params: ListUsersDto) {
	const schema = Joi.object<ListUsersDto>({
		page: Joi.number().min(1).required(),
		count: Joi.number().min(1).required(),
		q: Joi.string().allow('', null),
		f: Joi.object({
			name: Joi.string(),
			gpf: Joi.string(),
			email: Joi.string(),
			phone: Joi.number(),
			police_station: Joi.string().uuid({ version: 'uuidv4' }),
			designation: Joi.string(),
			role: Joi.valid(...roles)
		}),
		s: Joi.object({
			key: Joi.string().valid(
				'name',
				'gpf',
				'email',
				'phone',
				'police_station',
				'designation',
				'role'
			),
			order: Joi.string().valid('ASC', 'DESC')
		})
	});

	return schema.validateAsync(params);
}
