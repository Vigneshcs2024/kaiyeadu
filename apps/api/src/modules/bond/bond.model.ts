import { DataTypes, Model } from 'sequelize';
import { IBond, IBondInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

export class Bond extends Model<IBond, IBondInput> implements IBond {
	id: string;
	criminal: string;
	details: string;
	type: string;
	period: number;

	createdAt: Date;
	updatedAt: Date;
}

Bond.init(
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
		details: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
			allowNull: false
		},
		period: {
			type: DataTypes.INTEGER,
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
		timestamps: true,
		modelName: 'bonds'
	}
);
