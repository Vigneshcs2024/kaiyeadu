import { Transaction } from 'sequelize';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { LastArrest } from './last-arrest.model';
import { ClientError } from '$api/errors';

export function addLastArrest(
	criminal: Criminal['id'],
	lastArrest: LastArrestDto,
	transaction?: Transaction
) {
	logger.debug('Creating Last Arrest details...');

	if (!lastArrest) return Promise.resolve(null);

	return LastArrest.build({ ...lastArrest, criminal }).save({ transaction });
}

export function getLastArrest(criminal: Criminal['id'], transaction?: Transaction) {
	return LastArrest.findOne({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}

export async function update(id: string, details: Partial<LastArrestDto>) {
	logger.debug('Updating Last Arrest details...');

	const lastArrest = await LastArrest.findByPk(id);

	if (!lastArrest)
		throw new ClientError('The given id does not correspond to a last-arrest entry', 404);

	return lastArrest.update(details);
}

export function removeLastArrestDetailsOf(criminal: string, transaction?: Transaction) {
	return LastArrest.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return LastArrest.destroy({ where: { id } });
}
