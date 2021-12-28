import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { validateStringArray, validateUUID } from '$api/utilities/validations';
import * as repo from './occupation.repository';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { occupation }: { occupation: string[] } = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminalId);
	await Joi.array().items(Joi.string()).required().validateAsync(occupation);

	const result = await repo.addOccupation(criminalId, occupation);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Occupation added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: { name: string } } = req;

	await validateUUID(id);
	await validateStringArray([details.name]);

	const updated = await repo.update(id, details.name);
	res.json({ message: 'occupation updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;
	await validateUUID(id);

	await repo.remove(id);
	res.json({ message: `Successfully deleted occupation of id: ${id}` });
}
