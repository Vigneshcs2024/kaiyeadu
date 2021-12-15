import Joi from 'joi';
import { IModusOperandiInput } from '@kaiyeadu/api-interfaces/models';
import { logger } from '$api/tools';

export function validateModusOperandi(mo: IModusOperandiInput) {
	logger.debug('Validating: MO');

	const schema = Joi.object<IModusOperandiInput>({
		criminal: Joi.string().required(),
		type: Joi.string().required().messages({ 'any.required': 'Modus Operandi is required' })
	});

	return schema.validateAsync(mo);
}
