import Joi from 'joi';

export function validateEnum(enumValues: string[], value: string) {
	return Joi.string()
		.valid(...enumValues)
		.required()
		.validateAsync(value);
}
