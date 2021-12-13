import Joi from 'joi';

export function validateCreateAddress(createAddressOptions) {
	const schema = Joi.object({
		criminal: Joi.string().max(36).min(36).required(),
		type: Joi.string().required(),
		line1: Joi.string(),
		line2: Joi.string(),
		area: Joi.string(),
		city: Joi.string(),
		state: Joi.string()
	});

	return schema.validateAsync(createAddressOptions);
}
