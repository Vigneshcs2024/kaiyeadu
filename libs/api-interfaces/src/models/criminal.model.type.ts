export interface ICriminal {
	id: string;
	category: 'HS' | 'OCIU';
	grade: 'A_PLUS' | 'A' | 'B' | 'C';
	name: string;
	alias_name?: string;
	father_name?: string;
	gender: 'Male' | 'Female' | 'Transgender' | 'Other';
	dob: Date;
	phone_number?: number;
	religion?: string;
	caste?: string;
	hs_number: string;
	height?: number;
	identification_mark?: string;
	marital_status?: 'Married' | 'Unmarried' | 'Divorced' | 'Widowed';
	advocate_name?: string;
	bank_account_number?: string;
	present_status?: 'Active' | 'Dormant' | 'Inactive' | 'Absconded' | 'Imprisoned' | 'Unknown';
	image_url?: string;
	is_goondas?: boolean;
	remarks?: string;

	createdAt: Date;
	updatedAt: Date;
}

export type ICriminalInput = Omit<ICriminal, 'id' | 'createdAt' | 'updatedAt'>;
