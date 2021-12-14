import { IOccupationInput } from 'libs/api-interfaces/src/models';
import Joi from 'joi';

export function validateOccupationValidate(occupationOptions: IOccupationInput) {
	const schema = Joi.object<IOccupationInput>({
		criminal!: Joi.string().required(),
		name!: Joi.string().required(),
	});

	return schema.validateAsync(occupationOptions);
}
