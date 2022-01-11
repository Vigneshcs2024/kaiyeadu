export interface IModusOperandi {
	id: string;
	criminal: string;
	type: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IModusOperandiInput = Omit<IModusOperandi, 'id' | 'createdAt' | 'updatedAt'>;
