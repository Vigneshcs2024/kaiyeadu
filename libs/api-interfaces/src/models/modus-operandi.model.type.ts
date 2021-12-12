export interface IModusOperandi {
	id: string;
	criminal: string;
	type: string; // todo: enum?

	createdAt: Date;
	updatedAt: Date;
}

export type IModusOperandiInput = Omit<IModusOperandi, 'id' | 'createdAt' | 'updatedAt'>;
