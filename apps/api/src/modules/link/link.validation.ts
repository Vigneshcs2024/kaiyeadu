import Joi from 'joi';
import { LinkDto } from 'libs/api-interfaces/src/dtos';

export function validateLinks(link: LinkDto[]) {
	const schema = Joi.array().items(
		Joi.object<LinkDto>({
			name: Joi.string().required(),
			alias_name: Joi.string().allow(''),
			father_name: Joi.string().allow(''),
			city: Joi.string().allow(''),
			description: Joi.string().allow('')
		})
	);

	return schema.validateAsync(link);
}
