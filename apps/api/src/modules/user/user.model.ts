import { Model, DataTypes } from 'sequelize';
import { db } from '../../root/connections';
import { IUser, IUserInput } from '@kaiyeadu/api-interfaces/models';

export class User extends Model<IUser, IUserInput> implements IUser {
	public id!: string;
	public police_station!: string;
	public name!: string;
	public email!: string;
	public phone!: string;
	public password!: string;
	public designation!: string;

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
			// references: {
			// 	model: 'police_stations',
			// 	key: 'id'
			// }
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
		createdAt: DataTypes.DATE,
		updatedAt: DataTypes.DATE
	},
	{
		timestamps: true,
		sequelize: db,
		modelName: 'User'
	}
);
