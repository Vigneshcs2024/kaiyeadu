import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './associate.repository';
import { validateAddAssociates } from './associate.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: data }: { body: AssociatesDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateAddAssociates([data]);

	const updated = await repo.update(id, data);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Associate updated successfully', result: updated });
}
