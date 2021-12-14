import { Transaction } from 'sequelize';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { Bond } from './bond.model';

export function addBond(criminal: Criminal['id'], bond: BondDto, transaction: Transaction) {
	logger.debug('Creating Bonds...');

	return Bond.build({ ...bond, criminal }).save({ transaction });
}

export function getBondsOf(criminal: Criminal['id'], transaction?: Transaction) {
	return Bond.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
