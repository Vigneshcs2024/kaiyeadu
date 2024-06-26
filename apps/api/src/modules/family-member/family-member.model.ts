import { DataTypes, Model } from 'sequelize';
import { IFamily, IFamilyInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Depends on Criminal & Occupation

export class FamilyMember extends Model<IFamily, IFamilyInput> implements IFamily {
	id: string;
	criminal: string;
	name: string;
	relation: 'Father' | 'Mother' | 'Brother' | 'Sister' | 'Spouse' | 'Son' | 'Daughter' | 'Other';
	description: string;
	occupation: string;
	createdAt: Date;
	updatedAt: Date;
}

FamilyMember.init(
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
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		relation: {
			type: DataTypes.ENUM(
				'Father',
				'Mother',
				'Brother',
				'Sister',
				'Spouse',
				'Son',
				'Daughter',
				'Other'
			),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		occupation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: false
		}
	},
	{
		sequelize: db,
		modelName: 'family_member',
		timestamps: true
	}
);

FamilyMember.belongsTo(Criminal, { foreignKey: 'criminal', as: 'criminal_id' });
