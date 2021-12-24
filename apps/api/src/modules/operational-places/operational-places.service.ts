import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './operational-places.repository';
import { validateOperationalPlaces } from './operational-places.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { operationalPlaces }: { operationalPlaces: OpPlaceDto[] } = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminalId);
	await validateOperationalPlaces(operationalPlaces);

	const result = await repo.addOpPlaces(criminalId, operationalPlaces);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Operational places added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: OpPlaceDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateOperationalPlaces([details]);

	const updated = await repo.update(id, details);
	res.json({ message: 'operational-places updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted operational-places of id: ${id}` });
}
