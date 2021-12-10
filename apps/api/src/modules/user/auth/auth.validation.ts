import { AuthCredentialsDto, UserAuthCredentials } from '@kaiyeadu/api-interfaces/dtos';
import Joi from 'joi';

export function validateLogin(credentials: AuthCredentialsDto) {
	const schema = Joi.object<AuthCredentialsDto>({
		email: Joi.string().email().required(),
		password: Joi.string().min(8).max(30).required()
	});

	return schema.validateAsync(credentials);
}

export function validateLoginWithGPF(credentials: UserAuthCredentials) {
	const schema = Joi.object<UserAuthCredentials>({
		gpf: Joi.string().required(),
		password: Joi.string().min(8).max(30).required()
	});

	return schema.validateAsync(credentials);
}
