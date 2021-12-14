import { Transaction } from 'sequelize';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { FamilyMember } from './family-member.model';

export function addFamilyMembers(
	criminal: Criminal['id'],
	familyMembers: FamilyMemberDto[],
	transaction: Transaction
): Promise<FamilyMember[]> {
	return Promise.all(
		familyMembers.map(familyMember =>
			FamilyMember.build({ ...familyMember, criminal }).save({ transaction })
		)
	);
}

export function getFamilyMembersOf(criminal: Criminal['id'], transaction?: Transaction) {
	return FamilyMember.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
