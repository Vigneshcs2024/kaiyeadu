export interface IFamily {
	id: string;
	criminal: string;
	name: string;
	type: string; // todo enum
	description: string;
	occupation: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IFamilyInput = Omit<IFamily, 'id' | 'createdAt' | 'updatedAt'>;