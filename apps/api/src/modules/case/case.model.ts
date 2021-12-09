import { Model, DataTypes } from 'sequelize';
import { db } from '../../root/connections';
import { ICase, ICaseInput } from '@kaiyeadu/api-interfaces/models';
import { PoliceStation } from '../police-station/police-station.model';
// TODO import criminal

export class Case extends Model<ICase, ICaseInput> implements ICase {
	id: string;
	criminal: string;
	police_station: string;
	crime_number: number;
	under_Section: string;
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
			type: DataTypes.INTEGER,
			allowNull: false
		},
		under_Section: {
			type: DataTypes.STRING,
			allowNull: false
		},
		stage: {
			type: DataTypes.STRING,
			allowNull: false
		},
		remarks: {
			type: DataTypes.STRING,
			allowNull: false
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
		modelName: 'Case'
	}
);

Case.belongsTo(PoliceStation, {
	foreignKey: 'police_station'
});

// TODO Case.belongsTo(Criminal, {
//     foreignKey: "criminal",
// });
