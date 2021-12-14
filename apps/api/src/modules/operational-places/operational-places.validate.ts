import { IOperationalPlaceInput } from 'libs/api-interfaces/src/models';
import Joi from 'joi';

export function validateOperationalPlaces(operationalPlacesOptions: IOperationalPlaceInput) {
	const schema = Joi.object<IOperationalPlaceInput>({
		criminal: Joi.string().required(),
        state: Joi.string(),
	    district: Joi.string(),

	});

	return schema.validateAsync(operationalPlacesOptions);
}