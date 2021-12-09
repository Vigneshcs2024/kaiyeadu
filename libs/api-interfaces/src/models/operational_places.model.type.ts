export interface IOperational_places {
	id: string;
	criminal: string;
	state: string;
	district: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IOperational_placesInput = Omit<
	IOperational_places,
	'id' | 'criminal' | 'createdAt' | 'updatedAt'
>;
