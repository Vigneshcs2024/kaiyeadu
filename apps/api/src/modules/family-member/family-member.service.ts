import Joi from 'joi';
import { Response } from 'express';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import * as repo from './family-member.repository';
import { validateFamilyMembers } from './family-member.validation';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: FamilyMemberDto } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateFamilyMembers([details]);

	const familyMember = await repo.update(id, details);

	res.json({ message: 'Family Member updated', result: familyMember });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted family member of id: ${id}` });
}
