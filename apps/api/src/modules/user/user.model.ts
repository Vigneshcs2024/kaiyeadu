import { Model, DataTypes } from 'sequelize';
import { db } from '../../root/connections';
import { IUser, IUserInput } from '@kaiyeadu/api-interfaces/models';
import { PoliceStation } from '../police-station/police-station.model';

export class User extends Model<IUser, IUserInput> implements IUser {
	public id!: string;
	public police_station!: string;
	public name!: string;
	public email!: string;
	public phone!: string;
	public password!: string;
	public designation!: string;
	public kind!: 'user' | 'admin' | 'master';

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
		police_station: {
			type: DataTypes.UUID,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		designation: {
			type: DataTypes.STRING,
			allowNull: false
		},
		kind: {
			type: DataTypes.ENUM('user', 'admin', 'master'),
			allowNull: false,
			defaultValue: 'user'
		},
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
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
