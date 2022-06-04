import { logger } from '$api/tools';
import { accessLogger } from '$api/tools/access-logger';
import { ApiRequest } from '$api/types';
import { jsonPrettyPrint } from '$api/utilities';
import { validateEnum, validateUUID } from '$api/utilities/validations';
import { CreateProposalDto } from '@kaiyeadu/api-interfaces/dtos';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as proposalsRepo from './proposal.repository';
import { validateListProposals, validateProposal } from './proposal.validation';

export async function add(req: ApiRequest, res: Response) {
	const details: CreateProposalDto = req.body;
	const created_by = req.user.id;

	await validateProposal(details);

	const { id } = await proposalsRepo.create({
		...details,
		created_by
	});

	accessLogger(req, `Proposal created by &`);

	return res
		.status(StatusCodes.CREATED)
		.json({ message: 'Proposal created successfully', result: id });
}

export async function list(req: ApiRequest, res: Response) {
	const mp = new URLSearchParams(new URL(`http://[::1]/${req.url}`).search);
	const options: proposalsRepo.ProposalListOptions = {
		page: +mp.get('page') || 1,
		count: +mp.get('count') || 10,
		q: mp.get('q') ?? '',
		f: JSON.parse(mp.get('f')) ?? {},
		s: JSON.parse(mp.get('s')) ?? { key: 'createdAt', order: 'DESC' }
	};

	logger.debug(jsonPrettyPrint(options));

	await validateListProposals(options);

	const result = await proposalsRepo.list(options);

	accessLogger(req, `Proposals fetched by &`);

	return res.status(StatusCodes.OK).json({ message: 'Proposals fetched successfully', result });
}

export async function getById(req: ApiRequest, res: Response) {
	const { id } = req.params;
	await validateUUID(id);

	const proposal = await proposalsRepo.getProposal(id);

	accessLogger(req, `Proposal with id: ${id} is fetched by &`);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Proposal fetched successfully', result: proposal });
}

export async function updateStatus(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const { status }: { status: 'pending' | 'updated' | 'rejected' } = req.body;

	await validateUUID(id);
	await validateEnum(['pending', 'updated', 'rejected'], status);

	const proposal = await proposalsRepo.updateStatus(id, status);

	accessLogger(req, `Proposal with id: ${id} is updated by &`);

	return res
		.status(StatusCodes.OK)
		.json({ message: 'Proposal updated successfully', result: proposal });
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;
	await validateUUID(id);

	await proposalsRepo.remove(id);

	accessLogger(req, `Proposal with id: ${id} is removed by &`);

	return res.status(StatusCodes.OK).json({ message: 'Proposal removed successfully' });
}
