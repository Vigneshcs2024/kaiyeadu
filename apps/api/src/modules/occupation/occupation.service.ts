import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './occupation.repository';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await Joi.string().required().validateAsync(details);

	const updated = await repo.update(id, details);
	res.json({ message: 'occupation updated successfully', result: updated });
}
