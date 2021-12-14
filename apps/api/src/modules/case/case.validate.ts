import { ICaseInput } from '@kaiyeadu/api-interfaces/models';
import Joi from 'joi';


export function validateCase(caseOptions: ICaseInput) {
	const schema = Joi.object<ICaseInput>({
		criminal: Joi.string().required(),
		police_station: Joi.string().required(),
		crime_number: Joi.number().required(),
		under_section: Joi.string().required(),
		stage: Joi.string().required(),
		remarks: Joi.string(),
		date: Joi.date().required()
	});

	return schema.validateAsync(caseOptions);
}
