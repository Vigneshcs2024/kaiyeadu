import { Model, DataTypes } from 'sequelize';
import { db } from '../../root/connections';
import { IAddress, IAddressInput } from '@kaiyeadu/api-interfaces/models';
import { Criminal } from '../criminal/criminal.model';

export class Address extends Model<IAddress, IAddressInput> implements IAddress {
	id: string;
	criminal: string;
	type: string;
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
			type: DataTypes.STRING,
			allowNull: false
		},
		type: {
			type: DataTypes.STRING,
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
		tableName: 'Address',
		timestamps: true
	}
);

Address.belongsTo(Criminal, {
	foreignKey: 'criminal'
});
