import Joi from 'joi';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';

export function validateFamilyMembers(member: FamilyMemberDto[]) {
	logger.debug('Validating: Family Member');

	const schema = Joi.array().items(
		Joi.object<FamilyMemberDto>({
			name: Joi.string().required(),
			type: Joi.string()
				.required()
				.messages({ 'any.required': 'Family member type is required' }),
			description: Joi.string(),
			occupation: Joi.string()
		})
	);

	return schema.validateAsync(member);
}
