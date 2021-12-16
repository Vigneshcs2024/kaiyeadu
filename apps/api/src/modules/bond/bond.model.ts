import { DataTypes, Model } from 'sequelize';
import { IBond, IBondInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Depends on Criminal

export class Bond extends Model<IBond, IBondInput> implements IBond {
	id: string;
	criminal: string;
	details: string;
	type: '110CRPC' | '109CRPC' | '107CRPC';
	period: number;
	is_active: boolean;
	bound_down_details: string;
	expiry: Date;

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
		is_active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		bound_down_details: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		expiry: {
			type: DataTypes.DATE,
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

Bond.belongsTo(Criminal, { foreignKey: 'criminal', as: 'criminal_id' });
