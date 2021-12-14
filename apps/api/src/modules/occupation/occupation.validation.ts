import Joi from 'joi';
import { IOccupationInput } from '@kaiyeadu/api-interfaces/models';

export function validateOccupationValidate(occupation: IOccupationInput) {
	const schema = Joi.object<IOccupationInput>({
		criminal: Joi.string().required(),
		name: Joi.string().required()
	});

	return schema.validateAsync(occupation);
}
