export interface IOperationalPlace {
	id: string;
	criminal: string;
	state: string;
	district: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IOperationalPlaceInput = Omit<IOperationalPlace, 'id' | 'createdAt' | 'updatedAt'>;
