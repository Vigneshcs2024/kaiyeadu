import { BondDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Bond } from './bond.model';

export function addBond(criminal: Criminal['id'], bond: BondDto) {
	return Bond.build({ ...bond, criminal }).save();
}
