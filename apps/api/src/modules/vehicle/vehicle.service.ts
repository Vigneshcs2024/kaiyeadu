import Joi from 'joi';
import { Response } from 'express';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './vehicle.repository';
import { validateAddVehicles } from './vehicle.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: VehicleDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateAddVehicles([details]);

	const updated = await repo.update(id, details);
	res.json({ message: 'Vehicle updated successfully', result: updated });
}
