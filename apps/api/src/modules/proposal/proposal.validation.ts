import Joi from 'joi';
import { IProposalInput } from '@kaiyeadu/api-interfaces/models';

export function validateProposal(proposalDetails: IProposalInput) {
	const schema = Joi.object<IProposalInput>({
		criminal: Joi.string().required(),
		created_by: Joi.string().required(),
		description: Joi.string().required()
	});

	return schema.validateAsync(proposalDetails);
}
