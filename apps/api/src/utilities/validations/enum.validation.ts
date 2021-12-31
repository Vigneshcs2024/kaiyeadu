import Joi from 'joi';

export const validateEnum = (enumValues: string[], value: string) =>
	Joi.string()
		.valid(...enumValues)
		.required()
		.validateAsync(value);
