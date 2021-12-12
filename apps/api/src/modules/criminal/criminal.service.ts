import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import * as criminalRepo from './criminal.repository';

export async function create(req: ApiRequest, res: Response) {
	// todo: add validation using /libs/api-interfaces/src/dtos/criminal.dto.ts

	const criminal = await criminalRepo.create(req.body);

	return res.status(StatusCodes.CREATED).json({
		message: 'Criminal created successfully',
		result: criminal.id
	});
}
