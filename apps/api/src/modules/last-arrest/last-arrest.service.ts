import Joi from 'joi';
import { Response } from 'express';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './last-arrest.repository';
import { validateLastArrest } from './last-arrest.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: LastArrestDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateLastArrest(details);

	const updated = await repo.update(id, details);
	res.json({ message: 'last-arrest updated successfully', result: updated });
}
