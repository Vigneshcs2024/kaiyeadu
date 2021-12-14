import Joi from 'joi';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';

export function validateFamilyMembers(member: FamilyMemberDto[]) {
	const schema = Joi.array().items(
		Joi.object<FamilyMemberDto>({
			name: Joi.string().required(),
			type: Joi.string().required(),
			description: Joi.string(),
			occupation: Joi.string()
		})
	);

	return schema.validateAsync(member);
}
