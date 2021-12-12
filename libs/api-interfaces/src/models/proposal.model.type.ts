export interface IProposal {
	id: string;
	criminal: string;
	created_by: string;
	description: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IProposalInput = Omit<IProposal, 'id' | 'createdAt' | 'updatedAt'>;
