import { DataTypes, Model } from 'sequelize';
import { IAssociates, IAssociatesInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

export class Associates extends Model<IAssociates, IAssociatesInput> implements IAssociates {
	id!: string;
	criminal!: string;
	name!: string;
	father_name!: string;
	location!: string;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

Associates.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		criminal: {
			type: DataTypes.UUID,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		father_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		location: {
			type: DataTypes.STRING,
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
		sequelize: db,
		modelName: 'associates',
		timestamps: true
	}
);
