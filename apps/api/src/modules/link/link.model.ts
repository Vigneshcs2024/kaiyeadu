import { db } from '$api/root/connections';
import { ILinks, ILinksInput } from '@kaiyeadu/api-interfaces/models';
import { Model, DataTypes } from 'sequelize';

// Depends on Criminal

export class Link extends Model<ILinks, ILinksInput> implements ILinks {
	id: string;
	criminal: string;
	name: string;
	alias_name: string;
	father_name: string;
	city: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

Link.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		criminal: {
			type: DataTypes.UUID,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		alias_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		father_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		city: {
			type: DataTypes.STRING,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
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
		sequelize: db,
		timestamps: true,
		modelName: 'links'
	}
);
