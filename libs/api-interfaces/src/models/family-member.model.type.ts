export interface IFamily {
	id: string;
	criminal: string;
	name: string;
	relation:
		| 'Father'
		| 'Mother'
		| 'Brother'
		| 'Sister'
		| 'Spouse'
		| 'Son'
		| 'Daughter'
		| 'Other'
		| string;
	description: string;
	occupation: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IFamilyInput = Omit<IFamily, 'id' | 'createdAt' | 'updatedAt'>;
