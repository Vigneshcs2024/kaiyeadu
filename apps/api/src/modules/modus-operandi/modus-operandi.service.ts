import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './modus-operandi.repository';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: { name: string } } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await Joi.string().required().validateAsync(details.name);

	const updated = await repo.update(id, details.name);
	res.json({ message: 'Modus operandi updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted modus operandi of id: ${id}` });
}
