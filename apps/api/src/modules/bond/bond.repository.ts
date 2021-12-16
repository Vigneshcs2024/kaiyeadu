import { Transaction } from 'sequelize';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { Bond } from './bond.model';

export function addBonds(criminal: Criminal['id'], bonds: BondDto[], transaction: Transaction) {
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
