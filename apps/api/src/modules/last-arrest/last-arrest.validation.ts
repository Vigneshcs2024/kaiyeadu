import Joi from 'joi';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateLastArrest(lastArrestOptions: LastArrestDto) {
	logger.debug('Validating: Last Arrest');

	const schema = Joi.object<LastArrestDto>({
		section: Joi.string().required().allow(''),
		date: Joi.date().required().allow(''),
		crime_number: Joi.string().required().allow(''),
		kind: Joi.string().required().allow('')
	});

	return schema.validateAsync(lastArrestOptions);
}
