import Joi from 'joi';
import { CreateProposalDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateProposal(proposalDetails: CreateProposalDto) {
	const schema = Joi.object<CreateProposalDto>({
		criminal: Joi.string().uuid({ version: 'uuidv4' }).required(),
		description: Joi.string().required()
	});

	return schema.validateAsync(proposalDetails);
}
