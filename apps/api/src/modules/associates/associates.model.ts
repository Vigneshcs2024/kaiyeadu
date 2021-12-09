import { Model, DataTypes } from 'sequelize';
import { db } from '$api/root/connections';
import { IAssociates, IAssociatesImput } from '@kaiyeadu/api-interfaces/models';
import { Occupation } from '../occupation/occupation.model';
// TOTO import criminal

export class Associates extends Model<IAssociates, IAssociatesImput> implements IAssociates {
	id!: string;
	criminal!: string;
	occupation!: string;
	name!: string;
	district!: string;
	state!: string;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

Associates.init(
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
		occupation: {
			type: DataTypes.UUID,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		district: {
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
		modelName: 'Associates',
		timestamps: true
	}
);

Associates.belongsTo(Occupation, {
	foreignKey: 'occupation'
});

// TOTO Associates.belongsTo(Criminal, {
//     foreignKey: 'criminal'
// });
