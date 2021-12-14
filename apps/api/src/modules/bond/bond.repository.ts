import { Transaction } from 'sequelize';
import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Bond } from './bond.model';

export function addBond(criminal: Criminal['id'], bond: BondDto, transaction: Transaction) {
	return Bond.build({ ...bond, criminal }).save({ transaction });
}

export function getBondsOf(criminal: Criminal['id'], transaction?: Transaction) {
	return Bond.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
