import { Transaction } from 'sequelize';
import { FamilyMemberDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { FamilyMember } from './family-member.model';
import { ClientError } from '$api/errors';

export function addFamilyMembers(
	criminal: Criminal['id'],
	familyMembers: FamilyMemberDto[],
	transaction?: Transaction
): Promise<FamilyMember[]> {
	logger.debug('Creating Family Members...');

	if (!familyMembers?.length) return Promise.resolve([]);

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

export async function update(id: string, details: Partial<FamilyMemberDto>) {
	const familyMember = await FamilyMember.findByPk(id);
	if (!familyMember) {
		throw new ClientError('Family Member not found', 404);
	}
	return familyMember.update(details);
}

export function removeFamilyMembersOf(criminal: string, transaction?: Transaction) {
	return FamilyMember.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return FamilyMember.destroy({ where: { id } });
}
