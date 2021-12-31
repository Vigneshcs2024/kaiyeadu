import Joi from 'joi';

export const validateStringArray = (items: string[]) =>
	Joi.array().items(Joi.string()).validateAsync(items);
