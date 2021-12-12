import { AddressDto } from '@kaiyeadu/api-interfaces/dtos';
import { Address } from './address.model';

export function addAddress(criminal: string, address: AddressDto) {
	return Address.build({ ...address, criminal }).save();
}
