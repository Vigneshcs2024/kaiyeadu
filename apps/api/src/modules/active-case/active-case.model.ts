import { DataTypes, Model } from 'sequelize';
import { IActiveCase, IActiveCaseInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

// Dependant on Criminal & Case models
export class ActiveCase extends Model<IActiveCase, IActiveCaseInput> implements IActiveCase {
	id: string;
	criminal: string;
	case: string;
	court_name: string;
	stage: string;
	last_hearing: Date;
	next_hearing: Date;
	hearing_description: string;
	accused_attend_status: boolean;
	createdAt: Date;
	updatedAt: Date;
}

ActiveCase.init(
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
		case: {
			type: DataTypes.UUID,
			allowNull: false
		},
		court_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		stage: {
			type: DataTypes.STRING,
			allowNull: false
		},
		last_hearing: {
			type: DataTypes.DATE,
			allowNull: true
		},
		next_hearing: {
			type: DataTypes.DATE,
			allowNull: true
		},
		hearing_description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		accused_attend_status: {
			type: DataTypes.BOOLEAN,
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
		tableName: 'active_cases',
		timestamps: true,
		sequelize: db
	}
);
