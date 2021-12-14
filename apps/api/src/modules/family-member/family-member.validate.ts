import { IFamilyInput } from '@kaiyeadu/api-interfaces/models';
import Joi from 'joi';

export function validateFamilyMember(familyMemberOptions: IFamilyInput) {
	const schema = Joi.object<IFamilyInput>({
		criminal: Joi.string().required(),
		name: Joi.string().required(),
		type: Joi.string().required(),
		description: Joi.string(),
		occupation: Joi.string()
	});

	return schema.validateAsync(familyMemberOptions);
}
