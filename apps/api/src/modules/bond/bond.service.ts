import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './bond.repository';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: data } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	const updated = await repo.update(id, data);

	res.json({ message: 'Bond updated successfully', result: updated });
}
