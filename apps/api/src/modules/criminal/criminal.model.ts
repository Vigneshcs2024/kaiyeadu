import { DataTypes, Model } from 'sequelize';
import { ICriminal, ICriminalInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';

// Independent root model (other models depend on this)

export class Criminal extends Model<ICriminal, ICriminalInput> implements ICriminal {
	id: string;
	category: 'HS' | 'OCIU';
	grade: 'A_PLUS' | 'A' | 'B' | 'C';
	name: string;
	alias_name?: string;
	father_name?: string;
	gender: 'Male' | 'Female' | 'Transgender' | 'Other';
	dob: Date;
	phone_number?: number;
	religion?: string;
	caste?: string;
	marital_status?: 'Married' | 'Unmarried' | 'Divorced' | 'Widowed';
	hs_number: string;
	height?: number;
	identification_mark?: string;
	advocate_name?: string;
	bank_account_number?: string;
	present_status?: 'Active' | 'Dormant' | 'Inactive' | 'Absconded' | 'Imprisoned' | 'Unknown';
	image_url?: string;
	is_goondas?: boolean;
	remarks?: string;
	createdAt: Date;
	updatedAt: Date;
}

Criminal.init(
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
			allowNull: false
		},
		category: {
			type: DataTypes.ENUM('HS', 'OCIU'),
			allowNull: false
		},
		grade: {
			type: DataTypes.ENUM('A_PLUS', 'A', 'B', 'C'),
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		alias_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		father_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		dob: {
			type: DataTypes.DATE,
			allowNull: false
		},
		gender: {
			type: DataTypes.ENUM('Male', 'Female', 'Transgender', 'Other')
		},
		phone_number: {
			type: DataTypes.CHAR({ length: 10 }),
			allowNull: true
		},
		religion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		caste: {
			type: DataTypes.STRING,
			allowNull: true
		},
		hs_number: {
			type: DataTypes.STRING,
			unique: 'hs_number',
			allowNull: false
		},
		height: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		identification_mark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		marital_status: {
			type: DataTypes.ENUM('Married', 'Unmarried', 'Divorced', 'Widowed'),
			allowNull: true
		},
		advocate_name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		bank_account_number: {
			type: DataTypes.STRING,
			allowNull: true
		},
		present_status: {
			type: DataTypes.ENUM(
				'Active',
				'Dormant',
				'Inactive',
				'Absconded',
				'Imprisoned',
				'Unknown'
			),
			allowNull: true
		},
		image_url: {
			type: DataTypes.STRING,
			allowNull: true
		},
		is_goondas: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		remarks: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false
		}
	},
	{
		sequelize: db,
		timestamps: true,
		modelName: 'criminals'
	}
);
