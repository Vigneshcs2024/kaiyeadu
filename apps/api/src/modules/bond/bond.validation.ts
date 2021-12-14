import Joi from 'joi';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateBond(bondDetails: BondDto) {
	const schema = Joi.object<BondDto>({
		details: Joi.string().required(),
		type: Joi.string().required(),
		period: Joi.number().required()
	});

	return schema.validateAsync(bondDetails);
}
