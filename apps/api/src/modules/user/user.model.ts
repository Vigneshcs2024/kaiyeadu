import { Model, DataTypes } from 'sequelize';
import { db } from '$api/root/connections';
import { PoliceStation } from '../police-station/police-station.model';
import { IUser, IUserInput } from '@kaiyeadu/api-interfaces/models';

export class User extends Model<IUser, IUserInput> implements IUser {
	public id!: string;
	public name!: string;
	public gpf: string;
	public police_station!: string;
	public email!: string;
	public phone!: string;
	public password: string;
	public designation!: string;
	public role!: 'user' | 'admin' | 'master';

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		gpf: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		police_station: {
			type: DataTypes.UUID,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		designation: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.ENUM('user', 'admin', 'master'),
			allowNull: false,
			defaultValue: 'user'
		},
		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		timestamps: true,
		sequelize: db,
		modelName: 'User'
	}
);

User.belongsTo(PoliceStation, {
	foreignKey: 'police_station'
});
