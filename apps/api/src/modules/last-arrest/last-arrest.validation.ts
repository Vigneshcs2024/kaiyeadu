import Joi from 'joi';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateLastArrest(lastArrestOptions: LastArrestDto) {
	logger.debug('Validating: Last Arrest');

	const schema = Joi.object<LastArrestDto>({
		section: Joi.string().required(),
		date: Joi.date().required(),
		crime_number: Joi.string().required(),
		kind: Joi.string().required()
	});

	return schema.validateAsync(lastArrestOptions);
}
