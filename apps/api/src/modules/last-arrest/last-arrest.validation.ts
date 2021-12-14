import { ILastArrestInput } from '@kaiyeadu/api-interfaces/models';
import Joi from 'joi';

export function validateLastArrest(lastArrestOptions: ILastArrestInput) {
	const schema = Joi.object<ILastArrestInput>({
		criminal: Joi.string().required(),
		section: Joi.string().required(),
		date: Joi.date().required(),
		kind: Joi.string().required()
	});

	return schema.validateAsync(lastArrestOptions);
}
