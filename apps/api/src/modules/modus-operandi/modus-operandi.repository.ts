import { Transaction } from 'sequelize';
import { ModusOperandi } from './modus-operandi.model';

export function addModusOperandi(
	criminal: string,
	modusOperandi: string[],
	transaction: Transaction
) {
	return Promise.all(
		modusOperandi.map(mo => ModusOperandi.build({ criminal, type: mo }).save({ transaction }))
	);
}

export function getModusOperandi(criminal: string) {
	return ModusOperandi.findAll({ where: { criminal }, attributes: { exclude: ['criminal'] } });
}
