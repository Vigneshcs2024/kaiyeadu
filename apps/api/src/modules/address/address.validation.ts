import Joi from 'joi';
import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateCreateAddresses(addresses: AddressDto[]) {
	const schema = Joi.array().items(
		Joi.object<AddressDto>({
			type: Joi.string().required(),
			line1: Joi.string(),
			line2: Joi.string(),
			area: Joi.string(),
			city: Joi.string(),
			state: Joi.string()
		})
	);

	return schema.validateAsync(addresses);
}
