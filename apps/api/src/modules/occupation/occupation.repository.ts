import { Transaction } from 'sequelize';
import { OccupationDto } from '@kaiyeadu/api-interfaces/dtos';
import { Occupation } from './occupation.model';

export function addOccupation(
	person: string,
	occupation: OccupationDto[],
	transaction: Transaction
): Promise<Occupation[]> {
	return Occupation.bulkCreate(
		occupation.map(o => ({ criminal: person, ...o })),
		{ transaction }
	);
}

export function getOccupationsOf(person: string, transaction?: Transaction): Promise<Occupation[]> {
	return Occupation.findAll({
		where: { criminal: person },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
