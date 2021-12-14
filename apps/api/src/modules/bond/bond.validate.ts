import { IBondInput } from '@kaiyeadu/api-interfaces/models';
import Joi from 'joi';

export function validateBond(bondOptions: IBondInput) {
	const schema = Joi.object<IBondInput>({
		criminal: Joi.string().required(),
		details: Joi.string().required(),
		type: Joi.string().required(),
		period: Joi.number().required()
	});

	return schema.validateAsync(bondOptions);
}
