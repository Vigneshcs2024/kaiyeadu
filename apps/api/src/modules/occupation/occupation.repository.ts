import { Transaction } from 'sequelize';
import { Occupation } from './occupation.model';

export function addOccupation(
	person: string,
	occupation: string[],
	transaction: Transaction
): Promise<Occupation[]> {
	return Occupation.bulkCreate(
		occupation.map(occ => ({ criminal: person, name: occ })),
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
