export interface ILastArrest {
	id: string;
	criminal: string;
	section: string;
	crime_number: string;

	date: Date;
	kind: string;

	createdAt: Date;
	updatedAt: Date;
}

export type ILastArrestInput = Omit<ILastArrest, 'id' | 'createdAt' | 'updatedAt'>;
