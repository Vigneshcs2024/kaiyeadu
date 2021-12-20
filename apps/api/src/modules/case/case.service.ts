import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import * as caseRepo from './case.repository';
import { validateCases } from './case.validation';

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

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details } = req;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await validateCases([details]);

	const updatedCase = await caseRepo.update(id, details);

	return res.json({ message: 'Case updated successfully', result: updatedCase });
}
