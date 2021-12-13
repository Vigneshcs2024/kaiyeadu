import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Bond } from './bond.model';

export function addBond(criminal: Criminal['id'], bond: BondDto) {
	return Bond.build({ ...bond, criminal }).save();
}

export function getBondsOf(criminal: Criminal['id']) {
	return Bond.findAll({ where: { criminal }, attributes: { exclude: ['criminal'] } });
}
