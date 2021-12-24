import Joi from 'joi';
import { Response } from 'express';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './bond.repository';
import { validateBonds } from './bond.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: data }: { body: BondDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateBonds([data]);
	const updated = await repo.update(id, data);

	res.json({ message: 'Bond updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted bond of id: ${id}` });
}
