import { StatusCodes } from 'http-status-codes';
import { Transaction } from 'sequelize';
import { IProposalInput } from '@kaiyeadu/api-interfaces/models';
import { ClientError } from '$api/errors';
import { Proposal } from './proposal.model';

export function create(proposal: IProposalInput) {
	return Proposal.create(proposal);
}

export async function findAll(limit: number | string, page: number | string) {
	const result = await Proposal.findAndCountAll({
		limit: +limit || 10,
		offset: +limit * +page || 0,
		order: [['updatedAt', 'DESC']]
	});

	return { proposals: result.rows, total: result.count };
}

export async function getProposalsTo(criminal: string) {
	const proposals = await Proposal.findAll({
		where: { criminal },
		order: [['updatedAt', 'DESC']]
	});

	return proposals;
}

export async function getProposalsOf(user: string) {
	const proposals = await Proposal.findAll({
		where: { created_by: user },
		order: [['updatedAt', 'DESC']]
	});

	return proposals;
}

export function getProposal(id: string) {
	return Proposal.findByPk(id, { raw: true });
}

export async function updateStatus(id: string, status: 'pending' | 'updated' | 'rejected') {
	const proposal = await Proposal.findByPk(id);

	if (!proposal) {
		throw new ClientError('Proposal not found', StatusCodes.NOT_FOUND);
	}

	return proposal.update({ status });
}

export function remove(id: string) {
	return Proposal.destroy({ where: { id } });
}

export async function removeProposalTo(criminal: string, transaction: Transaction) {
	return Proposal.destroy({ where: { criminal }, transaction });
}
