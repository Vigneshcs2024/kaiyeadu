import { logger } from '$api/tools';
import { Transaction } from 'sequelize';
import { ModusOperandi } from './modus-operandi.model';

export function addModusOperandi(
	criminal: string,
	modusOperandi: string[],
	transaction: Transaction
) {
	logger.debug('Creating MOs...');

	return ModusOperandi.bulkCreate(
		modusOperandi.map(mo => ({ criminal, type: mo })),
		{ transaction }
	);
}

export function getModusOperandi(criminal: string) {
	return ModusOperandi.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		raw: true
	});
}
