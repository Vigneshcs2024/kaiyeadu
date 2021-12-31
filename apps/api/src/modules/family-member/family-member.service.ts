import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './family-member.repository';
import { validateFamilyMembers } from './family-member.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { familyMembers }: { familyMembers: FamilyMemberDto[] } = req.body;

	await validateUUID(criminalId);
	await validateFamilyMembers(familyMembers);

	const result = await repo.addFamilyMembers(criminalId, familyMembers);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Family members added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: FamilyMemberDto } = req;

	await validateUUID(id);
	await validateFamilyMembers([details]);

	const familyMember = await repo.update(id, details);

	res.json({ message: 'Family Member updated', result: familyMember });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted family member of id: ${id}` });
}
