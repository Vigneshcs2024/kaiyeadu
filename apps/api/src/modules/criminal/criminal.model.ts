import { Model, DataTypes } from "sequelize";
import { db } from "../../root/connections";
import { ICriminal, ICriminalInput } from "@kaiyeadu/api-interfaces/models";
import { Address } from "../address/address.model";

export class Criminal extends Model<ICriminal, ICriminalInput> implements ICriminal {
    id: string;
    category: string;
    name: string;
    alias_name: string;
    father_name: string;
    dob: Date;
    phone_number: number;
    religion: string;
    caste: string;
    hs_number: number;
    height: number;
    identification_mark: string;
    maritial_status: string;
    advocate_name: string;
    bank_account_number: string;
    present_status: string;
    present_location: string;
    image_url: string;
    isGoondas: boolean;
    remarks: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}

Criminal.init(
    {
        id:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        category:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        alias_name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        father_name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        phone_number:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        religion:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        caste:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        hs_number:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        identification_mark:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        maritial_status:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        advocate_name:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        bank_account_number:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        present_status:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        present_location:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        image_url:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        isGoondas:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        remarks:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt:
        {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        sequelize: db,
        timestamps: true,
        modelName: "Criminal",
    }
);

Criminal.belongsTo(Address, {
    foreignKey: "present_location",
})
