import { Transaction } from 'sequelize';
import { logger } from '$api/tools';
import { ModusOperandi } from './modus-operandi.model';

export function addModusOperandi(
	criminal: string,
	modusOperandi: string[],
	transaction: Transaction
) {
	logger.debug('Creating MOs...');

	if (!modusOperandi?.length) return Promise.resolve([]);

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
