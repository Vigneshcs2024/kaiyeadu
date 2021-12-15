import Joi from 'joi';
import { IAssociateInput } from '@kaiyeadu/api-interfaces/models';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateAssociate(associate: IAssociateInput) {
	const schema = Joi.object<IAssociateInput>({
		criminal: Joi.string().required(),
		name: Joi.string().required(),
		father_name: Joi.string(),
		location: Joi.string()
	});

	return schema.validateAsync(associate);
}

export function validateAddAssociates(associates: AssociatesDto[]) {
	const schema = Joi.array().items(
		Joi.object<AssociatesDto>({
			name: Joi.string().required(),
			father_name: Joi.string(),
			location: Joi.string()
		})
	);

	return schema.validateAsync(associates);
}
