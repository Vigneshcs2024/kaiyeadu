import Joi from 'joi';
import { CreateProposalDto } from '@kaiyeadu/api-interfaces/dtos';
import { ProposalListOptions } from './proposal.repository';

export function validateProposal(proposalDetails: CreateProposalDto) {
	const schema = Joi.object<CreateProposalDto>({
		criminal: Joi.string().uuid({ version: 'uuidv4' }).required(),
		description: Joi.string().required()
	});

	return schema.validateAsync(proposalDetails);
}

export function validateListProposals(options: ProposalListOptions) {
	const schema = Joi.object<ProposalListOptions>({
		count: Joi.number().min(1).max(100).default(10),
		page: Joi.number().min(1).default(1),
		f: Joi.object({
			created_by: Joi.string().uuid({ version: 'uuidv4' }),
			criminal: Joi.string().uuid({ version: 'uuidv4' }),
			status: Joi.string().valid('pending', 'updated', 'rejected')
		}),
		q: Joi.string().allow('', null),
		s: Joi.object({
			key: Joi.string().valid('createdAt', 'status'),
			order: Joi.string().valid('ASC', 'DESC')
		})
	});

	return schema.validateAsync(options);
}
