import Joi from 'joi';
import { Response } from 'express';
import { LinkDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './link.repository';
import { validateLinks } from './link.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: LinkDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateLinks([details]);

	const updated = await repo.update(id, details);
	res.json({ message: 'link updated successfully', result: updated });
}
