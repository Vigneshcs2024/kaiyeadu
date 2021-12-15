import Joi from 'joi';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateLastArrest(lastArrestOptions: LastArrestDto) {
	const schema = Joi.object<LastArrestDto>({
		section: Joi.string().required(),
		date: Joi.date().required(),
		kind: Joi.string().required()
	});

	return schema.validateAsync(lastArrestOptions);
}
