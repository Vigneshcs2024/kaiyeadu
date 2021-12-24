import { Transaction } from 'sequelize';
import { logger } from '$api/tools';
import { ModusOperandi } from './modus-operandi.model';
import { ClientError } from '$api/errors';

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

export async function update(id: string, details: string) {
	const mo = await ModusOperandi.findByPk(id);
	if (!mo) {
		throw new ClientError('The given id does not correspond to an MO', 404);
	}
	return mo.set({ type: details }).save();
}

export function removeModusOperandisOf(criminal: string, transaction?: Transaction) {
	return ModusOperandi.destroy({where:{criminal}, transaction});
}

export function remove(id: string) {
	return ModusOperandi.destroy({where: {id}});
}
