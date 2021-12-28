import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { validateStringArray, validateUUID } from '$api/utilities/validations';
import * as repo from './modus-operandi.repository';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { modusOperandi }: { modusOperandi: string[] } = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminalId);
	await Joi.array().items(Joi.string()).required().validateAsync(modusOperandi);

	const result = await repo.addModusOperandi(criminalId, modusOperandi);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Modus Operandi added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: { name: string } } = req;

	await validateUUID(id);
	await validateStringArray([details.name]);

	const updated = await repo.update(id, details.name);
	res.json({ message: 'Modus operandi updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted modus operandi of id: ${id}` });
}
