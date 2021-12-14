import Joi from 'joi';
import { IActiveCaseInput } from '@kaiyeadu/api-interfaces/models';

export function activeCaseValidate(activeCaseOptions: IActiveCaseInput) {
	const schema = Joi.object<IActiveCaseInput>({
		criminal: Joi.string().required(),
		case: Joi.string().required(),
		court_name: Joi.string().required(),
		last_hearing: Joi.date(),
		next_hearing: Joi.date(),
		hearing_description: Joi.string(),
		accused_attend_status: Joi.boolean().required()
	});

	return schema.validateAsync(activeCaseOptions);
}
