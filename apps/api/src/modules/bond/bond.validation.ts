import Joi from 'joi';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateBond(bondDetails: BondDto) {
	logger.debug('Validating: Bond');

	const schema = Joi.object<BondDto>({
		details: Joi.string().required(),
		type: Joi.string().required().messages({ 'any.required': 'Bond type is required' }),
		period: Joi.number().required(),
		is_active: Joi.boolean().required(),
		expiry: Joi.date().required()
	});

	return schema.validateAsync(bondDetails);
}
