export interface IActiveCase {
	id: string;
	criminal: string;
	case: string;
	court_name: string;
	last_hearing: Date | string;
	next_hearing: Date | string;
	hearing_description: string;
	accused_attend_status: boolean;

	createdAt: Date;
	updatedAt: Date;
}

export type IActiveCaseInput = Omit<IActiveCase, 'id' | 'createdAt' | 'updatedAt'>;
