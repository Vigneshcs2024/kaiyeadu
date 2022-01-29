import { StatusCodes } from 'http-status-codes';
import { Op, Transaction } from 'sequelize';
import { IProposal, IProposalInput } from '@kaiyeadu/api-interfaces/models';
import { ClientError } from '$api/errors';
import { Proposal } from './proposal.model';

export function create(proposal: IProposalInput) {
	return Proposal.create(proposal);
}

export type ProposalListOptions = {
	count?: number;
	page?: number;
	f?: Pick<IProposal, 'created_by' | 'criminal' | 'status'>;
	q?: string;
	s?: { key: keyof Pick<IProposal, 'createdAt' | 'status'>; order: 'ASC' | 'DESC' };
};
export async function list(options: ProposalListOptions) {
	const total = await Proposal.count();
	const proposals = await Proposal.findAll({
		where: {
			description: { [Op.like]: `%${options.q}%` },
			...options.f
		},
		offset: (options.page - 1) * options.count,
		limit: options.count,
		attributes: { exclude: ['createdAt', 'updatedAt'] },
		order: [[options.s.key, options.s.order]],
		raw: true
	});

	return { proposals, total };
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
