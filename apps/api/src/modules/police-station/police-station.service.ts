import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreatePSDto, PsFilteredListDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './police-station.repository';
import { validateCreatePS, validateListPs } from './police-station.validation';
import { logger } from '$api/tools';
import { jsonPrettyPrint } from '$api/utilities';

export async function findById(req: ApiRequest, res: Response) {
	const { id } = req.params;
	await validateUUID(id);

	const policeStation = await repo.getById(id);
	res.status(StatusCodes.OK).json({
		message: 'Police Station fetched successfully',
		result: policeStation
	});
}

export async function getList(req: ApiRequest, res: Response) {
	const mp = new URLSearchParams(new URL(`http://[::1]/${req.url}`).search);
	const options: PsFilteredListDto = {
		f: JSON.parse(mp.get('f')) ?? {},
		q: mp.get('q') ?? '',
		s: JSON.parse(mp.get('s')) ?? { key: 'name', order: 'ASC' }
	};

	if (mp.get('count') && mp.get('page')) {
		options.count = +mp.get('count');
		options.page = +mp.get('page');
	}

	logger.debug(jsonPrettyPrint(options));

	await validateListPs(options);
	const result = await repo.getFilteredList(options);

	res.json({
		message: 'Stations fetched successfully',
		result
	});
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

	await validateUUID(id);
	await validateCreatePS(details);

	const station = await repo.update(id, details);
	return res
		.status(StatusCodes.OK)
		.json({ message: 'Station updated successfully', result: station });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;
	await validateUUID(id);

	await repo.remove(id);
	return res
		.status(StatusCodes.OK)
		.json({ message: `Successfully deleted station of id: ${id}` });
}
