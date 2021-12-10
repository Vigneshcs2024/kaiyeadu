export interface IOccupation {
	id: string;
	criminal: string;
	name: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IOccupationInput = Omit<IOccupation, 'id' | 'createdAt' | 'updatedAt'>;
