import { Optional } from "sequelize";

export interface IProposal {
    id: string;
    created_by: string;
    created_at: string;
    description: string;

    createdAt: Date;
	updatedAt: Date;
}

export type IProposalInput = Optional<IProposal, "id" | "createdAt" | "updatedAt">;
