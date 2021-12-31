import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateUUID } from '$api/utilities/validations';
import * as caseRepo from './case.repository';
import { validateCases } from './case.validation';

export async function add(req: ApiRequest, res: Response) {
	const { criminalId } = req.params;
	const { cases }: { cases: CaseDto[] } = req.body;

	await validateUUID(criminalId);
	await validateCases(cases);

	const createdCases = await caseRepo.addCases(criminalId, cases);
	res.status(StatusCodes.CREATED).json({
		message: 'Cases added successfully',
		result: createdCases
	});
}

export async function getAll(req: ApiRequest, res: Response) {
	const { criminal_id } = req.params;

	await validateUUID(criminal_id);

	const cases = await caseRepo.getAllCasesOf(criminal_id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Full Case details fetched successfully', result: cases });
}

export async function getInactiveCases(req: ApiRequest, res: Response) {
	const { criminal_id } = req.params;

	await validateUUID(criminal_id);

	const cases = await caseRepo.getInactiveCasesOf(criminal_id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Cases fetched successfully', result: cases });
}

export async function update(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { body: details }: { body: CaseDto } = req;

	await validateUUID(id);
	await validateCases([details]);

	const updatedCase = await caseRepo.update(id, details);

	return res.json({ message: 'Case updated successfully', result: updatedCase });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await caseRepo.remove(id);

	res.json({ message: `Successfully deleted case of id: ${id}` });
}
