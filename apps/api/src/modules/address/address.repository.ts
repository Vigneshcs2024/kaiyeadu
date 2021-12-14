import { Transaction } from 'sequelize';
import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../models';
import { Address } from './address.model';

export function addAddress(criminal: string, addresses: AddressDto[], transaction: Transaction) {
	return Address.bulkCreate(addresses.map(a => ({ criminal, ...a }), { transaction }));
}

export function getAddressesOf(criminal: Criminal['id']): Promise<Address[]> {
	return Address.findAll({ where: { criminal }, attributes: { exclude: ['criminal'] } });
}
