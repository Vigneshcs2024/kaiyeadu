import { Transaction } from 'sequelize';
import { LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { LastArrest } from './last-arrest.model';

export function addLastArrest(
	criminal: Criminal['id'],
	lastArrest: LastArrestDto,
	transaction: Transaction
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
