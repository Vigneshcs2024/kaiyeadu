import { Transaction } from 'sequelize';
import { logger } from '$api/tools';
import { Occupation } from './occupation.model';

export function addOccupation(
	person: string,
	occupation: string[],
	transaction: Transaction
): Promise<Occupation[]> {
	logger.debug('Creating occupations...');

	if (!occupation?.length) return Promise.resolve([]);

	return Occupation.bulkCreate(
		occupation.map(occ => ({ criminal: person, name: occ })),
		{ transaction }
	);
}

export function getOccupationsOf(person: string, transaction?: Transaction): Promise<Occupation[]> {
	return Occupation.findAll({
		where: { criminal: person },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}
