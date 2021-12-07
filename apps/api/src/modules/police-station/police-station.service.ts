import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as policeStationRepository from './police-station.repository';
import { CreatePSDto } from '@kaiyeadu/api-interfaces/dtos';
import { validateCreatePS } from './police-station.validation';

export async function listStations(_req: ApiRequest, res: Response) {
	const stations = await policeStationRepository.listPoliceStations();

	return res.json({ message: 'Stations fetched successfully', result: stations });
}

export async function createStation(req: ApiRequest, res: Response) {
	const details: CreatePSDto = req.body;

	await validateCreatePS(details);

	const station = await policeStationRepository.createPoliceStation(details);

	return res.json({ message: 'Station created successfully', result: station.id });
}
