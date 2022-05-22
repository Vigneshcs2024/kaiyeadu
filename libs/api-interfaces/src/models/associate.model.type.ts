export interface IAssociate {
	id: string;
	criminal: string;
	name: string;
	father_name: string;
	location: string;
	gender: 'Male' | 'Female' | 'Transgender' | 'Other' | string;

	createdAt: Date;
	updatedAt: Date;
}

export type IAssociateInput = Omit<IAssociate, 'id' | 'createdAt' | 'updatedAt'>;
