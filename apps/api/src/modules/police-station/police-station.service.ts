import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as policeStationRepository from './police-station.repository';

export async function listStations(req: ApiRequest, res: Response) {
	const stations = await policeStationRepository.listPoliceStations();

	return res.json({ message: 'Stations fetched successfully', result: stations });
}
