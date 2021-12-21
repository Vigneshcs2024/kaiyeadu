import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './family-member.repository';
import { validateLinks } from '../link/link.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateLinks([details]);

	const familyMember = await repo.update(id, details);

	res.json({ message: 'Family Member updated', result: familyMember });
}
