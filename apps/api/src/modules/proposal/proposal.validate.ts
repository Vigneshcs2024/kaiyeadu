import { IProposalInput } from 'libs/api-interfaces/src/models';
import Joi from 'joi';

export function validateProposal(proposalOptions: IProposalInput) {
	const schema = Joi.object<IProposalInput>({
		criminal: Joi.string().required(),
        created_by!: Joi.string().required(),
	    description!: Joi.string().required(),
	});

	return schema.validateAsync(proposalOptions);
}