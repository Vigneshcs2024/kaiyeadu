import { IAssociateInput } from '@kaiyeadu/api-interfaces/models';
import Joi from 'joi';

export function validateAssociate(associateOptions: IAssociateInput) {
	const schema = Joi.object<IAssociateInput>({
		criminal: Joi.string().required(),
		name: Joi.string().required(),
		father_name: Joi.string(),
		location: Joi.string()
	});

	return schema.validateAsync(associateOptions);
}
