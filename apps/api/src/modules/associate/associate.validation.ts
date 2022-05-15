import Joi from 'joi';
import { IAssociateInput } from '@kaiyeadu/api-interfaces/models';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateAssociate(associate: IAssociateInput) {
	const schema = Joi.object<IAssociateInput>({
		criminal: Joi.string().allow(''),
		name: Joi.string().allow(''),
		father_name: Joi.string().allow(''),
		gender: Joi.valid('Male', 'Female', 'Transgender', 'Other'),
		location: Joi.string().allow('')
	});

	return schema.validateAsync(associate);
}

export function validateAddAssociates(associates: AssociatesDto[]) {
	const schema = Joi.array().items(
		Joi.object<AssociatesDto>({
			name: Joi.string().required().allow(''),
			father_name: Joi.string().allow(''),
			gender: Joi.valid('Male', 'Female', 'Transgender', 'Other'),
			location: Joi.string().allow('')
		})
	);

	return schema.validateAsync(associates);
}
