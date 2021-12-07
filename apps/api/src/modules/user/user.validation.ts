import Joi from 'joi';
import { CreateUserDto, UpdatePasswordDto } from '@kaiyeadu/api-interfaces/dtos';
import { IUserInput } from '@kaiyeadu/api-interfaces/models';

export function validateCreateUser(userDetails: CreateUserDto) {
	const schema = Joi.object<IUserInput & CreateUserDto>({
		name: Joi.string().min(3).max(30).required(),
		gpf: Joi.string().alphanum(),
		email: Joi.string().email().required(),
		phone: Joi.string().min(10).max(10).required(),
		password: Joi.string().min(8).max(30),
		police_station: Joi.string().min(36).max(36).required().messages({
			'string.min': `'police_station' must be a valid uuid`,
			'string.max': `'police_station' must be a valid uuid`
		}),
		designation: Joi.string().min(3).max(30).required(),
		role: Joi.valid('user', 'admin', 'master').required()
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
