export interface ICase {
	id: string;
	criminal: string;
	police_station: string;
	crime_number: string;
	under_section: string;
	stage: string;
	remarks: string;
	date: Date | string;

	createdAt: Date;
	updatedAt: Date;
}

export type ICaseInput = Omit<ICase, 'id' | 'createdAt' | 'updatedAt'>;
