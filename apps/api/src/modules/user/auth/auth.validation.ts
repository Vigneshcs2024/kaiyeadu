import { AuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import Joi from 'joi';

export function validateLogin(credentials: AuthCredentialsDto) {
	const schema = Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(30).required()
	});

	return schema.validateAsync(credentials);
}
