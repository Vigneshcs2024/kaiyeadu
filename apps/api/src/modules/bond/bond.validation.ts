import Joi from 'joi';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateBond(bonds: BondDto[]) {
	logger.debug('Validating: Bond');

	const schema = Joi.array().items(
		Joi.object<BondDto>({
			details: Joi.string().required(),
			type: Joi.string()
				.required()
				.valid('110CRPC', '109CRPC', '107CRPC')
				.messages({ 'any.required': 'Bond type is required' }),
			period: Joi.number().required(),
			is_active: Joi.boolean().required(),
			bound_down_details: Joi.string(),
			expiry: Joi.date().required()
		})
	);

	return schema.validateAsync(bonds);
}
