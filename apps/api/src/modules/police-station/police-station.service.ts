import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { CreatePSDto } from '@kaiyeadu/api-interfaces/dtos';
import * as policeStationRepository from './police-station.repository';
import { validateCreatePS } from './police-station.validation';

export async function getPoliceStation(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().min(36).max(36).required().validateAsync(id);

	const policeStation = await policeStationRepository.getPoliceStation(id);
	res.status(StatusCodes.OK).json({
		message: 'Police Station fetched successfully',
		result: policeStation
	});
}

export async function listStations(_req: ApiRequest, res: Response) {
	const stations = await policeStationRepository.listPoliceStations();

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Stations fetched successfully', result: stations });
}

export async function createStation(req: ApiRequest, res: Response) {
	const details: CreatePSDto = req.body;

	await validateCreatePS(details);

	const station = await policeStationRepository.createPoliceStation(details);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Station created successfully', result: station.id });
}
