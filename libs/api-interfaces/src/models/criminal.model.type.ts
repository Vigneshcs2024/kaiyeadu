export interface ICriminal {
	id: string;
	category: string;
	name: string;
	alias_name: string;
	father_name: string;
	dob: Date;
	phone_number: number;
	religion: string;
	caste: string;
	hs_number: number;
	height: number;
	identification_mark: string;
	maritial_status: string;
	advocate_name: string;
	bank_account_number: string;
	present_status: string;
	present_location: string;
	image_url: string;
	isGoondas: boolean;
	remarks: string;

	createdAt: Date;
	updatedAt: Date;
}

export type ICriminalInput = Omit<ICriminal, 'id' | 'createdAt' | 'updatedAt'>;
