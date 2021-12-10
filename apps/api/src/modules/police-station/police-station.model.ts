import { Model, DataTypes } from 'sequelize';
import { db } from '$api/root/connections';
import { IPoliceStation, IPoliceStationInput } from '@kaiyeadu/api-interfaces/models';

export class PoliceStation
	extends Model<IPoliceStation, IPoliceStationInput>
	implements IPoliceStation
{
	public id!: string;
	public name!: string;
	public area!: string;
	public district!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

PoliceStation.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		area: {
			type: DataTypes.STRING,
			allowNull: false
		},
		district: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		timestamps: true,
		sequelize: db,
		modelName: 'PoliceStation'
	}
);
