import { Model, DataTypes } from "sequelize";
import { db } from "../../root/connections";
import { IVehicle, IVehicleInput } from "@kaiyeadu/api-interfaces/models";
// TODO : import Criminal model

export class Vehicle extends Model<IVehicle, IVehicleInput> implements IVehicle {
    id: string;
    criminal: string;
    type: string;
    reg_no: string;
    description: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}

Vehicle.init(
    {
        id :
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        criminal:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        type:
        {
            type: DataTypes.TEXT,
            allowNull: false
        },
        reg_no:
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        description:
        {
            type: DataTypes.TEXT,
            allowNull: true
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: db,
        tableName: "vehicle",
        timestamps: true
    }
);


// TODO - Add criminal as foreign key to criminal table
