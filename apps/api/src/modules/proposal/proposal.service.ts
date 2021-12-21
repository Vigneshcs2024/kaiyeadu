import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateProposalDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { ApiRequest } from '$api/types';

import * as proposalsRepo from './proposal.repository';

export async function add(req: ApiRequest, res: Response) {
	const { criminal, description, status }: CreateProposalDto = req.body;
	const created_by = req.user.id;

	// todo: validation

	const { id } = await proposalsRepo.create({
		criminal,
		description,
		created_by,
		status
	});
	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Proposal created successfully', result: id });
}

export async function list(req: ApiRequest, res: Response) {
	const { page, limit } = req.query;

	if (typeof page !== 'string' || typeof limit !== 'string') {
		throw new ClientError('Invalid query parameters', StatusCodes.BAD_REQUEST);
	}

	const { proposals, total } = await proposalsRepo.findAll(limit as string, page as string);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Proposals fetched successfully', result: { proposals, total } });
}

export async function getById(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);

	const proposal = await proposalsRepo.getProposal(id);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Proposal fetched successfully', result: proposal });
}

export async function updateStatus(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { status } = req.body;

	await Joi.string().uuid({ version: 'uuidv4' }).required().validateAsync(id);
	await Joi.string().valid('pending', 'updated', 'rejected').required().validateAsync(status);

	const proposal = await proposalsRepo.updateStatus(id, status);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Proposal updated successfully', result: proposal });
}
