import Joi from 'joi';
import { IOperationalPlaceInput } from '@kaiyeadu/api-interfaces/models';

export function validateOperationalPlaces(opPlace: IOperationalPlaceInput) {
	const schema = Joi.object<IOperationalPlaceInput>({
		criminal: Joi.string().required(),
		state: Joi.string(),
		district: Joi.string()
	});

	return schema.validateAsync(opPlace);
}
