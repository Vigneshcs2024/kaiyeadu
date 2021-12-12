import { DataTypes, Model } from 'sequelize';
import { ILastArrest, ILastArrestInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

export class LastArrest extends Model<ILastArrest, ILastArrestInput> {
	id!: string;
	criminal!: string;
	section!: string;

	date!: Date;
	kind!: string;

	createdAt!: Date;
	updatedAt!: Date;
}

LastArrest.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		criminal: {
			type: DataTypes.STRING,
			allowNull: false
		},
		section: {
			type: DataTypes.STRING,
			allowNull: false
		},

		date: { type: DataTypes.DATE, allowNull: false },
		kind: { type: DataTypes.STRING, allowNull: false },

		createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
		updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
	},
	{
		timestamps: true,
		sequelize: db,
		modelName: 'last_arrest'
	}
);
