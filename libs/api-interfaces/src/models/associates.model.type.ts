export interface IAssociate {
	id: string;
	criminal: string;
	name: string;
	father_name: string;
	location: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IAssociateInput = Omit<IAssociate, 'id' | 'createdAt' | 'updatedAt'>;
