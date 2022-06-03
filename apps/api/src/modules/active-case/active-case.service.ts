import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as repo from './active-case.repository';
import { accessLogger } from '$api/tools/access-logger';

export async function getAll(req: ApiRequest, res: Response) {
	const { criminal_id } = req.params;

	await validateUUID(criminal_id);

	const activeCases = await repo.getActiveCasesOf(criminal_id);

	accessLogger(req, `Active Cases fetched`, criminal_id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Active Cases fetched successfully', result: activeCases });
}
