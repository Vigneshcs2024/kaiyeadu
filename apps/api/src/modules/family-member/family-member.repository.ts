import { Transaction } from 'sequelize';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { FamilyMember } from './family-member.model';

export function addFamilyMembers(
	criminal: Criminal['id'],
	familyMembers: FamilyMemberDto[],
	transaction: Transaction
): Promise<FamilyMember[]> {
	logger.debug('Creating Family Members...');

	return FamilyMember.bulkCreate(
		familyMembers.map(fm => ({ criminal, ...fm })),
		{ transaction }
	);
}

export function getFamilyMembersOf(criminal: Criminal['id'], transaction?: Transaction) {
	return FamilyMember.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}
