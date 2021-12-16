import { Transaction } from 'sequelize';
import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../models';
import { Address } from './address.model';

export function addAddress(criminal: string, addresses: AddressDto[], transaction: Transaction) {
	logger.debug('Creating Addresses...');

	return Promise.all(addresses.map(a => Address.create({ criminal, ...a }, { transaction })));

	// return Address.bulkCreate(addresses.map(a => ({ criminal, ...a }), { transaction }));
}

export function getAddressesOf(criminal: Criminal['id']): Promise<Address[]> {
	return Address.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] },
		raw: true
	});
}
