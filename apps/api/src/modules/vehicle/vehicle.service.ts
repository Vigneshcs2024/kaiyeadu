import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './vehicle.repository';
import { validateAddVehicles } from './vehicle.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { vehicles }: { vehicles: VehicleDto[] } = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminalId);
	await validateAddVehicles(vehicles);

	const result = await repo.addVehicles(criminalId, vehicles);

	return res.status(StatusCodes.CREATED).json({ message: 'Vehicles added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: VehicleDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateAddVehicles([details]);

	const updated = await repo.update(id, details);
	res.json({ message: 'Vehicle updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted Vehicle of id: ${id}` });
}
