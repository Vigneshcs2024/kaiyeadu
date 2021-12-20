import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import * as repo from './associate.repository';
import { validateAssociate } from './associate.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: data } = req;

	await validateAssociate(data);

	const updated = await repo.update(id, data);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Associate updated successfully', result: updated });
}
