import { Transaction } from 'sequelize';
import { OpPlaceDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { OperationalPlace } from './operational-places.model';

export function addOpPlaces(
	criminal: Criminal['id'],
	places: OpPlaceDto[],
	transaction?: Transaction
) {
	logger.debug('Creating Operational places...');

	if (!places?.length) return Promise.resolve([]);

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

export async function update(id: string, placeDetails: OpPlaceDto) {
	const lastArrest = await OperationalPlace.findByPk(id);

	if (!lastArrest) {
		throw new ClientError('The given id does not correspond to a Operational place', 404);
	}
	return lastArrest.update(placeDetails);
}

export function removeOpPsOf(criminal: string, transaction?: Transaction) {
	return OperationalPlace.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return OperationalPlace.destroy({ where: { id } });
}
