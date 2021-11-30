import Joi from 'joi';
import { CreateUserDto } from '@kaiyeadu/api-interfaces/dtos';
import { IUserInput } from '@kaiyeadu/api-interfaces/models';

export function validateCreateUser(userDetails: CreateUserDto) {
	const schema = Joi.object<IUserInput & CreateUserDto>({
		name: Joi.string().min(3).max(30).required(),
		email: Joi.string().email().required(),
		phone: Joi.string().min(10).max(10).required(),
		password: Joi.string().min(8).max(30).required(),
		police_station: Joi.string().min(36).max(36).required(),
		designation: Joi.string().min(3).max(30).required(),
		role: Joi.valid('user', 'admin', 'master').required()
	});

	return schema.validateAsync(userDetails);
}
