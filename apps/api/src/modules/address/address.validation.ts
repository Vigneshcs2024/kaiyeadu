import Joi from 'joi';
import { IAddressInput } from 'libs/api-interfaces/src/models';

export function validateCreateAddress(createAddressOptions: IAddressInput) {
	const schema = Joi.object<IAddressInput>({
		criminal: Joi.string().uuid({ version: 'uuidv4' }).required(),
		type: Joi.string().required(),
		line1: Joi.string(),
		line2: Joi.string(),
		area: Joi.string(),
		city: Joi.string(),
		state: Joi.string()
	});

	return schema.validateAsync(createAddressOptions);
}
