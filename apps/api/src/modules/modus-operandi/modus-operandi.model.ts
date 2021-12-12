import { DataTypes, Model } from 'sequelize';
import { IModusOperandi, IModusOperandiInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

// Depends only on Criminal

export class ModusOperandi
	extends Model<IModusOperandi, IModusOperandiInput>
	implements IModusOperandi
{
	id: string;
	criminal: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
}

ModusOperandi.init(
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
		type: {
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
		modelName: 'modus_operandi',
		timestamps: true
	}
);
