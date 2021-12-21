import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreatePSDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './police-station.repository';
import { validateCreatePS } from './police-station.validation';

export async function findById(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().min(36).max(36).required().validateAsync(id);

	const policeStation = await repo.getById(id);
	res.status(StatusCodes.OK).json({
		message: 'Police Station fetched successfully',
		result: policeStation
	});
}

export async function getList(_req: ApiRequest, res: Response) {
	const stations = await repo.getAll();

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Stations fetched successfully', result: stations });
}

export async function getNames(req: ApiRequest, res: Response) {
	const { q } = req.query || {};
	const stations = await repo.getNames(q as string | undefined);
	return res.status(StatusCodes.OK).json({ message: 'Fetched successfully', result: stations });
}

export async function create(req: ApiRequest, res: Response) {
	const details: CreatePSDto = req.body;

	await validateCreatePS(details);

	const station = await repo.create(details);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Station created successfully', result: station.id });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const details: CreatePSDto = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateCreatePS(details);

	const station = await repo.update(id, details);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Station updated successfully', result: station });
}
