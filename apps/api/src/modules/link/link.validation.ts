import Joi from 'joi';
import { LinkDto } from 'libs/api-interfaces/src/dtos';

export function validateLinks(link: LinkDto[]) {
	const schema = Joi.array().items(
		Joi.object<LinkDto>({
			name: Joi.string().required(),
			alias_name: Joi.string(),
			father_name: Joi.string(),
			city: Joi.string(),
			description: Joi.string()
		})
	);

	return schema.validateAsync(link);
}
