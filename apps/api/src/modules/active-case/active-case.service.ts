import Joi from 'joi';
import { Response } from 'express';
import { ApiRequest } from '$api/types';
import * as repo from './active-case.repository';
import { StatusCodes } from 'http-status-codes';

export async function getAll(req: ApiRequest, res: Response) {
	const { criminal_id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminal_id);

	const activeCases = await repo.getActiveCasesOf(criminal_id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Active Cases fetched successfully', result: activeCases });
}