import Joi from 'joi';
import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateCreateAddresses(addresses: AddressDto[]) {
	logger.debug('Validating: Create Address');

	const schema = Joi.array().items(
		Joi.object<AddressDto>({
			type: Joi.string().required().messages({ 'any.required': 'Address type is required' }),
			line1: Joi.string(),
			line2: Joi.string(),
			area: Joi.string(),
			city: Joi.string(),
			state: Joi.string()
		})
	);

	return schema.validateAsync(addresses);
}
