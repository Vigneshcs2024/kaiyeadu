import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './address.repository';
import { validateCreateAddresses } from './address.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateCreateAddresses([body]);

	await repo.updateAddress(id, body);

	return res.json({ message: `Successfully updated active case ${id}` });
}
