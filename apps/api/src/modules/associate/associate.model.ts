import { DataTypes, Model } from 'sequelize';
import { IAssociate, IAssociateInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { Criminal } from '../criminal/criminal.model';

// Depends on criminal

export class Associate extends Model<IAssociate, IAssociateInput> implements IAssociate {
	id!: string;
	criminal!: string;
	name!: string;
	father_name!: string;
	gender: 'Male' | 'Female' | 'Transgender' | 'Other';
	location!: string;

	readonly createdAt!: Date;
	readonly updatedAt!: Date;
}

Associate.init(
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
		father_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		gender: {
			type: DataTypes.ENUM('Male', 'Female', 'Transgender', 'Other'),
			defaultValue: 'Male',
			allowNull: false
		},
		location: {
			type: DataTypes.STRING,
			allowNull: true
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
		modelName: 'associates',
		timestamps: true
	}
);

Associate.belongsTo(Criminal, { foreignKey: 'criminal', as: 'criminal_id' });
