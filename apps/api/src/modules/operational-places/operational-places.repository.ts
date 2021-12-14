import { Transaction } from 'sequelize';
import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { OperationalPlace } from './operational-places.model';

export function addOpPlaces(
	criminal: Criminal['id'],
	places: OpPlaceDto[],
	transaction: Transaction
) {
	return Promise.all(
		places.map(place => OperationalPlace.build({ ...place, criminal }).save({ transaction }))
	);
}

export function getOpPlacesOf(criminal: Criminal['id'], transaction?: Transaction) {
	return OperationalPlace.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
