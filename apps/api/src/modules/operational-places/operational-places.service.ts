import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './operational-places.repository';
import { validateOperationalPlaces } from './operational-places.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateOperationalPlaces(details);

	const updated = await repo.update(id, details);
	res.json({ message: 'operational-places updated successfully', result: updated });
}
