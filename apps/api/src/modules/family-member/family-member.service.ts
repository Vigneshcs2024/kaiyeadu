import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './family-member.repository';

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details } = req;

	const familyMember = await repo.update(id, details);

	res.json({ message: 'Family Member updated', result: familyMember });
}
