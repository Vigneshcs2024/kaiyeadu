import Joi from 'joi';
import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateOperationalPlaces(opPlace: OpPlaceDto[]) {
	const schema = Joi.array().items(
		Joi.object<OpPlaceDto>({
			state: Joi.string().allow(''),
			district: Joi.string().allow('')
		})
	);

	return schema.validateAsync(opPlace);
}
