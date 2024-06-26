import Joi from 'joi';
import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateCases(caseDetails: CaseDto[]) {
	const schema = Joi.array().items(
		Joi.object<CaseDto>({
			police_station: Joi.string().required(),
			crime_number: Joi.string().required(),
			under_section: Joi.string().required(),
			stage: Joi.string().required(),
			remarks: Joi.string().allow(''),
			date: Joi.date().required(),
			is_active: Joi.boolean().required(),
			court_name: Joi.string().allow(''),
			last_hearing: Joi.date(),
			next_hearing: Joi.date(),
			hearing_description: Joi.string().allow(''),
			accused_attend_status: Joi.boolean()
		})
	);

	return schema.validateAsync(caseDetails);
}
