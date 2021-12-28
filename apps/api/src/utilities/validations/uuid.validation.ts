import Joi from 'joi';

export const validateUUID = Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync;
