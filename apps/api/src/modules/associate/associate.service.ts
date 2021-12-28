import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './associate.repository';
import { validateAddAssociates } from './associate.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { associates }: { associates: AssociatesDto[] } = req.body;

	await validateUUID(criminalId);
	await validateAddAssociates(associates);

	const createdAssociates = await repo.addAssociates(criminalId, associates);
	res.status(StatusCodes.CREATED).json({
		message: 'Associates added successfully',
		result: createdAssociates
	});
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: data }: { body: AssociatesDto } = req;

	await validateUUID(id);
	await validateAddAssociates([data]);

	const updated = await repo.update(id, data);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Associate updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	return res
		.status(StatusCodes.OK)
		.json({ message: `Successfully deleted associate of id: ${id}` });
}
