export interface IOperationalPlaces {
	id: string;
	criminal: string;
	state: string;
	district: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IOperationalPlacesInput = Omit<IOperationalPlaces, 'id' | 'createdAt' | 'updatedAt'>;
