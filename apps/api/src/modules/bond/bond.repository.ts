import { Transaction } from 'sequelize';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { Bond } from './bond.model';

export function addBonds(criminal: Criminal['id'], bonds: BondDto[], transaction?: Transaction) {
	logger.debug('Creating Bonds...');

	if (!bonds?.length) return Promise.resolve([]);

	return Bond.bulkCreate(
		bonds.map(b => ({ ...b, criminal })),
		{ transaction }
	);
}

export function getBondsOf(criminal: Criminal['id'], transaction?: Transaction) {
	return Bond.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}

export async function update(id: string, details: BondDto) {
	const bond = await Bond.findByPk(id);

	if (!bond) {
		throw new ClientError('The given id does not correspond to a bond', 404);
	}

	return bond.update(details);
}

export function removeBondsOf(criminal: string, transaction: Transaction) {
	return Bond.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return Bond.destroy({ where: { id } });
}
