import { Model, DataTypes } from 'sequelize';
import { IProposal, IProposalInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

export class Proposal extends Model<IProposal, IProposalInput> implements IProposal {
	id!: string;
	criminal!: string;
	created_by!: string;
	description!: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

Proposal.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		criminal: {
			type: DataTypes.STRING,
			allowNull: false
		},
		created_by: {
			type: DataTypes.UUID,
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	},
	{
		tableName: 'proposals',
		sequelize: db,
		timestamps: true
	}
);
