export interface ICriminal {
	id: string;
	category: 'HS' | 'OCIU';
	grade: 'A+' | 'A' | 'B' | 'C';
	name: string;
	alias_name?: string;
	father_name?: string;
	dob: Date;
	phone_number?: number;
	religion?: string;
	caste?: string;
	hs_number: number;
	height?: number;
	identification_mark?: string;
	marital_status?: string;
	advocate_name?: string;
	bank_account_number?: string;
	present_status?: string;
	image_url?: string;
	is_goondas?: boolean;
	remarks?: string;

	createdAt: Date;
	updatedAt: Date;
}

export type ICriminalInput = Omit<ICriminal, 'id' | 'createdAt' | 'updatedAt'>;
