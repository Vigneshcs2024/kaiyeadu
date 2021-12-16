import Joi from 'joi';
import { ListCriminalsDto } from '@kaiyeadu/api-interfaces/dtos';
import { ICriminalInput } from '@kaiyeadu/api-interfaces/models';
import { ListCriminalsQuery } from './criminal.repository';

export function validateCreateCriminal(criminalDetails: ICriminalInput) {
	const schema: Joi.ObjectSchema<ICriminalInput> = Joi.object({
		name: Joi.string().required(),
		alias_name: Joi.string().required(),
		category: Joi.valid('HS', 'OCIU').required(),
		grade: Joi.valid('A+', 'A', 'B', 'C'),
		father_name: Joi.string(),
		dob: Joi.date()
			.less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
			.required()
			.error(new Error('Date of birth is required and must be 18 years or older')),
		phone_number: Joi.number().min(4_444_444_444).max(9_999_999_999),
		religion: Joi.string(),
		caste: Joi.string(),
		hs_number: Joi.string().required(),
		height: Joi.number().min(120).max(250),
		identification_mark: Joi.string(),
		marital_status: Joi.string(),
		advocate_name: Joi.string(),
		bank_account_number: Joi.string(),
		present_status: Joi.string(),
		image_url: Joi.string(),
		is_goondas: Joi.boolean(),
		remarks: Joi.string()
	});

	return schema.validateAsync(criminalDetails);
}

export function validateListCriminalsQuery(options: ListCriminalsDto) {
	const schema: Joi.ObjectSchema<ListCriminalsDto> = Joi.object({
		page: Joi.number().min(1).default(1),
		count: Joi.number().min(1).max(100).default(10),
		q: Joi.string().default(''),
		f: Joi.object<ListCriminalsQuery['params']['filters']>({
			caste: Joi.string(),
			category: Joi.string().valid('HS', 'OCIU'),
			grade: Joi.string().valid('A+', 'A', 'B', 'C'),
			is_goondas: Joi.boolean(),
			marital_status: Joi.string(),
			present_status: Joi.string(),
			religion: Joi.string()
		}),
		s: Joi.object<ListCriminalsQuery['params']['sort']>({
			key: Joi.string().valid(
				'category',
				'grade',
				'name',
				'alias_name',
				'dob',
				'hs_number',
				'height'
			),
			order: Joi.string().valid('ASC', 'DESC')
		})
	});

	return schema.validateAsync(options);
}
