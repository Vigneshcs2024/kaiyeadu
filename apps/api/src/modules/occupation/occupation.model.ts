import { Model, DataTypes } from 'sequelize';
import { IOccupation, IOccupationInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Depends only on Criminal

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
			type: DataTypes.UUID,
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
		modelName: 'occupation'
	}
);

Occupation.belongsTo(Criminal, { foreignKey: 'criminal', as: 'criminal_id' });
