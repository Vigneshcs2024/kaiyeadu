import Joi from 'joi';
import { IModusOperandiInput } from '@kaiyeadu/api-interfaces/models';

export function validateModusOperandi(mo: IModusOperandiInput) {
	const schema = Joi.object<IModusOperandiInput>({
		criminal: Joi.string().required(),
		type: Joi.string().required()
	});

	return schema.validateAsync(mo);
}
