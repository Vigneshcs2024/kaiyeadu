import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import * as caseRepo from './case.repository';

export async function getAll(req: ApiRequest, res: Response) {
	const { criminal_id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminal_id);

	const cases = await caseRepo.getAllCasesOf(criminal_id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Full Case details fetched successfully', result: cases });
}

export async function getInactiveCases(req: ApiRequest, res: Response) {
	const { criminal_id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(criminal_id);

	const cases = await caseRepo.getInactiveCasesOf(criminal_id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Cases fetched successfully', result: cases });
}
