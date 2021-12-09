export interface ILinks {
	id: string;
	criminal: string;
	name: string;
	alias_name: string;
	father_name: string;
	city: string;
	description: string;

	createAt: Date;
	updatedAt: Date;
}

export type ILinksInput = Omit<ILinks, 'id' | 'createdAt' | 'updatedAt'>;
