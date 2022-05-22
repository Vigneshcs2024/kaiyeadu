export interface IAddress {
	id: string;
	criminal: string;
	type: 'Present' | 'Native' | 'Other' | string;
	line1: string;
	line2: string;
	area: string;
	city: string;
	state: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IAddressInput = Omit<IAddress, 'id' | 'createdAt' | 'updatedAt'>;
