import { Model, DataTypes } from "sequelize";
import { db } from "../../root/connections";
import { IProposal, IProposalInput } from "@kaiyeadu/api-interfaces/models";

export class Proposal extends Model<IProposal, IProposalInput> implements IProposal {
    id!: string;
    created_by!: string;
    created_at!: string;
    description!: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}

Proposal.init(
    {
        id: 
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        created_by: 
        {
            type: DataTypes.UUID,
            allowNull: false
        },
        created_at: 
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        description: 
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        tableName: "proposal",
        sequelize: db,
        timestamps: true
    }
);
