export interface IProposal {
    id: string;
    criminal : string;
    created_by: string;
    created_at: string;
    description: string;

    createdAt: Date;
	updatedAt: Date;
}

export type IProposalInput = Omit<IProposal, "id" | "createdAt" | "updatedAt">;
