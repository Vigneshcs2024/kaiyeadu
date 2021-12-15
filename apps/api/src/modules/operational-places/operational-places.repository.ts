import { Transaction } from 'sequelize';
import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { OperationalPlace } from './operational-places.model';

export function addOpPlaces(
	criminal: Criminal['id'],
	places: OpPlaceDto[],
	transaction: Transaction
) {
	logger.debug('Creating Operational places...');
	return OperationalPlace.bulkCreate(
		places.map(place => ({ criminal, ...place })),
		{ transaction }
	);
}

export function getOpPlacesOf(criminal: Criminal['id'], transaction?: Transaction) {
	return OperationalPlace.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}
