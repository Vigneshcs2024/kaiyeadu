import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './modus-operandi.repository';
import { validateModusOperandi } from './modus-operandi.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateModusOperandi(details);

	const updated = await repo.update(id, details);
	res.json({ message: 'Modus operandi updated successfully', result: updated });
}
