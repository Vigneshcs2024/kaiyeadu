import Joi from 'joi';
import { ILinksInput } from '@kaiyeadu/api-interfaces/models';

export function validateLink(link: ILinksInput) {
	const schema = Joi.object<ILinksInput>({
		criminal: Joi.string().required(),

		name: Joi.string().required(),
		alias_name: Joi.string(),
		father_name: Joi.string(),
		city: Joi.string(),
		description: Joi.string()
	});

	return schema.validateAsync(link);
}
