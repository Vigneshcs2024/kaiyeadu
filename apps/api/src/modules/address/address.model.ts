import { Model, DataTypes } from 'sequelize';
import { IAddress, IAddressInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Dependent only on Criminal

export class Address extends Model<IAddress, IAddressInput> implements IAddress {
	id: string;
	criminal: string;
	type: 'Present' | 'Native' | 'Other';
	line1: string;
	line2: string;
	area: string;
	city: string;
	state: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

Address.init(
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
		type: {
			type: DataTypes.ENUM('Present', 'Native', 'Other'),
			allowNull: false
		},
		line1: {
			type: DataTypes.STRING,
			allowNull: false
		},
		line2: {
			type: DataTypes.STRING,
			allowNull: false
		},
		area: {
			type: DataTypes.STRING,
			allowNull: false
		},
		city: {
			type: DataTypes.STRING,
			allowNull: false
		},
		state: {
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
		tableName: 'address',
		timestamps: true
	}
);

Address.belongsTo(Criminal, {
	foreignKey: 'criminal',
	as: 'criminal_id'
});
