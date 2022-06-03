import { Model, DataTypes } from 'sequelize';
import { db } from '$api/root/connections';
import { Criminal, PoliceStation, User } from '../models';

export class AccessLog extends Model {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[x: string]: any;
	id: string;
	userId: string;
	criminalId: string;
	policeStationId: string;
	log: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

AccessLog.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		userId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false
		},
		log: {
			type: DataTypes.STRING,
			allowNull: false
		},
		criminalId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: true
		},
		policeStationId: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
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
		tableName: 'access-log',
		timestamps: true
	}
);

AccessLog.belongsTo(User, { foreignKey: 'userId', as: 'user_id' });
AccessLog.belongsTo(Criminal, { foreignKey: 'criminalId', as: 'criminal_id' });
AccessLog.belongsTo(PoliceStation, { foreignKey: 'policeStationId', as: 'police_station_id' });
