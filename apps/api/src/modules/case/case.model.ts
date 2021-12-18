import { Model, DataTypes } from 'sequelize';
import { ICase, ICaseInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { PoliceStation } from '../police-station/police-station.model';
import { Criminal } from '../criminal/criminal.model';

// Dependant on Criminal & PoliceStation

export class Case extends Model<ICase, ICaseInput> implements ICase {
	id: string;
	criminal: string;
	police_station: string;
	crime_number: string;
	under_section: string;
	stage: string;
	remarks: string;
	date: Date;

	readonly createdAt: Date;
	readonly updatedAt: Date;
}

Case.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		criminal: {
			type: DataTypes.UUID,
			allowNull: false
		},
		police_station: {
			type: DataTypes.UUID,
			allowNull: false
		},
		crime_number: {
			type: DataTypes.STRING,
			allowNull: false
		},
		under_section: {
			type: DataTypes.STRING,
			allowNull: false
		},
		stage: {
			type: DataTypes.STRING,
			allowNull: false
		},
		remarks: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		date: {
			type: DataTypes.DATE,
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
		modelName: 'cases'
	}
);

Case.belongsTo(PoliceStation, {
	foreignKey: 'police_station',
	as: 'police_station_id'
});

Case.belongsTo(Criminal, {
	foreignKey: 'criminal',
	as: 'criminal_id'
});
