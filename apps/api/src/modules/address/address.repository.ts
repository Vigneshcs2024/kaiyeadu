import { Transaction } from 'sequelize';
import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { logger } from '$api/tools';
import { Criminal } from '../models';
import { Address } from './address.model';
import { StatusCodes } from 'http-status-codes';

export function addAddress(criminal: string, addresses: AddressDto[], transaction: Transaction) {
	logger.debug('Creating Addresses...');

	if (!addresses?.length) return Promise.resolve([]);

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

export async function updateAddress(id: string, data: Partial<AddressDto>) {
	const address = await Address.findByPk(id);
	if (!address) {
		throw new ClientError(
			'The specified id does not correspond to an address',
			StatusCodes.NOT_FOUND
		);
	}

	return address.update(data);
}

export function removeAddressesOf(criminalId: string, transaction?: Transaction) {
	return Address.destroy({ where: { criminal: criminalId }, transaction });
}

export function remove(id: string) {
	return Address.destroy({ where: { id } });
}
