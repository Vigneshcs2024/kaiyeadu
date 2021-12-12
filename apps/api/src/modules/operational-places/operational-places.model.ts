import { Model, DataTypes } from 'sequelize';
import { IOperationalPlace, IOperationalPlaceInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Depends only on Criminal

export class OperationalPlace
	extends Model<IOperationalPlace, IOperationalPlaceInput>
	implements IOperationalPlace
{
	id: string;
	criminal: string;
	state: string;
	district: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

OperationalPlace.init(
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
		state: {
			type: DataTypes.STRING,
			allowNull: false
		},
		district: {
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
		tableName: 'operational_places',
		timestamps: true
	}
);

OperationalPlace.belongsTo(Criminal, { foreignKey: 'criminal', as: 'criminal_id' });
