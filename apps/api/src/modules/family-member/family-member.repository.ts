import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { FamilyMember } from './family-member.model';

export function addFamilyMembers(criminal: Criminal['id'], familyMembers: FamilyMemberDto[]) {
	return Promise.all(
		familyMembers.map(familyMember => FamilyMember.build({ ...familyMember, criminal }).save())
	);
}

export function getFamilyMembersOf(criminal: Criminal['id']) {
	return FamilyMember.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] }
	});
}
