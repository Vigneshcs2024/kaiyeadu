export interface IAssociates {
	id: string;
	criminal: string;
	name: string;
	father_name: string;
	location: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IAssociatesInput = Omit<IAssociates, 'id' | 'createdAt' | 'updatedAt'>;
