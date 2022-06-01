import { Model, DataTypes } from 'sequelize';
import { db } from '$api/root/connections';
import { User } from '../models';

export class AccessLog extends Model {
	userId: string;
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

AccessLog.belongsTo(User, {
	foreignKey: 'userId',
	as: 'user_id'
});
