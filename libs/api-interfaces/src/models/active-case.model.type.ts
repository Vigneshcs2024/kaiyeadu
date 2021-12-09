export interface IActiveCase {
	id: string;
	criminal: string;
	case: string;
	court_name: string;
	stage: string; // todo: enum
	last_hearing: Date;
	next_hearing: Date;
	hearing_description: string;
	accused_attend_status: boolean;

	createAt: Date;
	updatedAt: Date;
}

export type IActiveCaseInput = Omit<IActiveCase, 'id' | 'createdAt' | 'updatedAt'>;
