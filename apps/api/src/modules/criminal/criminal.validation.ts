import Joi from 'joi';
import { ListCriminalsQueryDto } from '@kaiyeadu/api-interfaces/dtos';
import { ICriminalInput } from '@kaiyeadu/api-interfaces/models';
import { ListCriminalsQuery } from './criminal.repository';

export function validateCreateCriminal(criminalDetails: ICriminalInput) {
	const schema: Joi.ObjectSchema<ICriminalInput> = Joi.object({
		name: Joi.string().required(),
		alias_name: Joi.string().allow(''),
		category: Joi.valid('HS', 'OCIU').required(),
		grade: Joi.valid('A_PLUS', 'A', 'B', 'C'),
		gender: Joi.valid('Male', 'Female', 'Transgender', 'Other'),
		father_name: Joi.string().allow(''),
		dob: Joi.date()
			.less(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
			.required()
			.error(new Error('Date of birth is required and must be 18 years or older')),
		phone_number: Joi.number().min(4_444_444_444).max(9_999_999_999),
		religion: Joi.string().allow(''),
		caste: Joi.string().allow(''),
		hs_number: Joi.string().required(),
		height: Joi.number().min(120).max(250),
		identification_mark: Joi.string().allow(''),
		marital_status: Joi.string().valid('Unmarried', 'Married', 'Divorced', 'Widowed'),
		advocate_name: Joi.string().allow(''),
		bank_account_number: Joi.string().allow(''),
		present_status: Joi.string().allow(''),
		image_url: Joi.string().allow(''),
		is_goondas: Joi.boolean(),
		remarks: Joi.string().allow('')
	});

	return schema.validateAsync(criminalDetails);
}

export function validateListCriminalsQuery(options: ListCriminalsQueryDto) {
	const schema: Joi.ObjectSchema<ListCriminalsQueryDto> = Joi.object({
		page: Joi.number().min(1).allow(null),
		count: Joi.number().min(1).max(100).allow(null),
		q: Joi.string().allow('', null),
		f: Joi.object<ListCriminalsQuery['params']['filters']>({
			caste: Joi.string(),
			category: Joi.string().valid('HS', 'OCIU'),
			grade: Joi.string().valid('A_PLUS', 'A', 'B', 'C'),
			is_goondas: Joi.boolean(),
			marital_status: Joi.string(),
			present_status: Joi.string(),
			religion: Joi.string()
		}).allow(null),
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
		}).allow(null)
	});

	return schema.validateAsync(options);
}
