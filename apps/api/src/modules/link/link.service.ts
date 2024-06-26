import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LinkDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './link.repository';
import { validateLinks } from './link.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { links }: { links: LinkDto[] } = req.body;

	await validateUUID(criminalId);
	await validateLinks(links);

	const result = await repo.addLinks(criminalId, links);

	return res.status(StatusCodes.CREATED).json({ message: 'Links added successfully', result });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: LinkDto } = req;

	await validateUUID(id);
	await validateLinks([details]);

	const updated = await repo.update(id, details);
	res.json({ message: 'link updated successfully', result: updated });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await repo.remove(id);

	res.json({ message: `Successfully deleted link of id: ${id}` });
}
