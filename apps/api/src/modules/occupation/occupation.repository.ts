import { Transaction } from 'sequelize';
import { logger } from '$api/tools';
import { Occupation } from './occupation.model';
import { ClientError } from '$api/errors';

export function addOccupation(
	person: string,
	occupation: string[],
	transaction?: Transaction
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

export async function update(id: string, details: string) {
	const lastArrest = await Occupation.findByPk(id);

	if (!lastArrest) {
		throw new ClientError('The given id does not correspond to a occupation', 404);
	}
	return lastArrest.update({ name: details });
}

export function removeOccupationsOf(criminal: string, transaction?: Transaction) {
	return Occupation.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return Occupation.destroy({ where: { id } });
}
