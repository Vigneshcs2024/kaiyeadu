import Joi from 'joi';

export const validateUUID = (uuid: string) =>
	Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(uuid);
