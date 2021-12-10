import { Model, DataTypes } from 'sequelize/dist';
import { db } from '$api/root/connections';
import { IOperationalPlaces, IOperationalPlacesInput } from '@kaiyeadu/api-interfaces/models';
// TODO : import Criminal model

export class OperationalPlaces
	extends Model<IOperationalPlaces, IOperationalPlacesInput>
	implements IOperationalPlaces
{
	id: string;
	criminal: string;
	state: string;
	district: string;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

OperationalPlaces.init(
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

// TODO - Add criminal as foreign key to criminal table
