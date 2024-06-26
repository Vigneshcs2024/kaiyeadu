import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './operational-places.repository';
import { validateOperationalPlaces } from './operational-places.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { operationalPlaces }: { operationalPlaces: OpPlaceDto[] } = req.body;

	await validateUUID(criminalId);
	await validateOperationalPlaces(operationalPlaces);

	const result = await repo.addOpPlaces(criminalId, operationalPlaces);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Operational places added successfully', result });
}

export async function getDistricts(_req: ApiRequest, res: Response) {
	const result = await repo.getDistricts();

	return res.json(result);
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: OpPlaceDto } = req;

	await validateUUID(id);
	await validateOperationalPlaces([details]);

	const updated = await repo.update(id, details);
	res.json({ message: 'operational-places updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted operational-places of id: ${id}` });
}
