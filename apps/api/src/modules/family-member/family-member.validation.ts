import Joi from 'joi';
import { IFamilyInput } from '@kaiyeadu/api-interfaces/models';

export function validateFamilyMember(member: IFamilyInput) {
	const schema = Joi.object<IFamilyInput>({
		criminal: Joi.string().required(),
		name: Joi.string().required(),
		type: Joi.string().required(),
		description: Joi.string(),
		occupation: Joi.string()
	});

	return schema.validateAsync(member);
}
