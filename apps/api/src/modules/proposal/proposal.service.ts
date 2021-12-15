import { Response } from 'express';
import { CreateProposalDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';

import * as proposalsRepo from './proposal.repository';
import { StatusCodes } from 'http-status-codes';
import { ClientError } from '$api/errors';
import Joi from 'joi';

export async function add(req: ApiRequest, res: Response) {
	const { criminal, description }: CreateProposalDto = req.body;
	const created_by = req.user.id;

	// todo: validation

	const { id } = await proposalsRepo.create({ criminal, description, created_by });
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