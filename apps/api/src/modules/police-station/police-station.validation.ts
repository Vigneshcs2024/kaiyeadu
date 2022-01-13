import Joi from 'joi';
import { CreatePSDto, PsFilteredListDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateCreatePS(policeStationDetails: CreatePSDto) {
	const schema = Joi.object({
		name: Joi.string().required(),
		area: Joi.string().required(),
		district: Joi.string().required()
	});

	return schema.validateAsync(policeStationDetails);
}

export function validateListPs(params: PsFilteredListDto) {
	const schema = Joi.object<PsFilteredListDto>({
		page: Joi.number().min(1).required(),
		count: Joi.number().min(1).required(),
		q: Joi.string().allow('', null),
		f: Joi.object({
			area: Joi.string(),
			district: Joi.string()
		}),
		s: Joi.object({
			key: Joi.string().valid('name', 'area', 'district'),
			order: Joi.string().valid('ASC', 'DESC')
		})
	});

	return schema.validateAsync(params);
}
