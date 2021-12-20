import { Model, DataTypes } from 'sequelize';
import { IVehicle, IVehicleInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Depends only on Criminal

export class Vehicle extends Model<IVehicle, IVehicleInput> implements IVehicle {
	id: string;
	criminal: string;
	type: 'Two-Wheeler' | 'Three-Wheeler' | 'Four-Wheeler' | 'Heavy Vehicle';
	reg_no: string;
	description: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

Vehicle.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		criminal: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		type: {
			type: DataTypes.ENUM('Two-Wheeler', 'Three-Wheeler', 'Four-Wheeler', 'Heavy Vehicle'),
			allowNull: false
		},
		reg_no: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
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
		tableName: 'vehicles',
		timestamps: true
	}
);

Criminal.hasMany(Vehicle, { foreignKey: 'criminal', as: 'criminal' });
