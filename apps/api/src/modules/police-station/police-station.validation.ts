import Joi from 'joi';
import { CreatePSDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateCreatePS(policeStationDetails: CreatePSDto) {
	const schema = Joi.object({
		name: Joi.string().required(),
		area: Joi.string().required(),
		district: Joi.string().required()
	});

	return schema.validateAsync(policeStationDetails);
}
