import { Model, DataTypes } from 'sequelize';
import { IVehicle, IVehicleInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

// Depends only on Criminal

export class Vehicle extends Model<IVehicle, IVehicleInput> implements IVehicle {
	id: string;
	criminal: string;
	type: string;
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
			type: DataTypes.TEXT,
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

// TODO - Add criminal as foreign key to criminal table
