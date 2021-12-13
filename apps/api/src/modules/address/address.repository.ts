import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../models';
import { Address } from './address.model';

export function addAddress(criminal: string, address: AddressDto) {
	return Address.build({ ...address, criminal }).save();
}

export function getAddressOf(criminal: Criminal['id']): Promise<Address[]> {
	return Address.findAll({ where: { criminal }, attributes: { exclude: ['criminal'] } });
}
