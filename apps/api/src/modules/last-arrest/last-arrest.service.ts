import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './last-arrest.repository';
import { validateLastArrest } from './last-arrest.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { lastArrest }: { lastArrest: LastArrestDto } = req.body;

	await validateUUID(criminalId);
	await validateLastArrest(lastArrest);

	const result = await repo.addLastArrest(criminalId, lastArrest);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Last Arrest details added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: LastArrestDto } = req;

	await validateUUID(id);
	await validateLastArrest(details);

	const updated = await repo.update(id, details);
	res.json({ message: 'last-arrest updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted last-arrest of id: ${id}` });
}
