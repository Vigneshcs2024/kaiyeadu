import Joi from 'joi';
import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateCases(caseDetails: CaseDto[]) {
	const schema = Joi.array().items(
		Joi.object<CaseDto>({
			police_station: Joi.string().required(),
			crime_number: Joi.number().required(),
			under_section: Joi.string().required(),
			stage: Joi.string().required(),
			remarks: Joi.string(),
			date: Joi.date().required()
		})
	);

	return schema.validateAsync(caseDetails);
}
