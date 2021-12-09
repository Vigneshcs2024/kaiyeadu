import { Model, DataTypes } from 'sequelize';
import { db } from '$api/root/connections';
import { IOccupation, IOccupationInput } from '@kaiyeadu/api-interfaces/models';
// TOTO import criminal

export class Occupation extends Model<IOccupation, IOccupationInput> implements IOccupation {
	id!: string;
	criminal!: string;
	name!: string;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

Occupation.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		criminal: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
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
		timestamps: true,
		sequelize: db,
		modelName: 'Occupation'
	}
);

// TODO criminal as foreign key
