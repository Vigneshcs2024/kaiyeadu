import { Model, DataTypes } from "sequelize/dist";
import { db } from "../../root/connections";
import { IOperational_places, IOperational_placesInput } from "@kaiyeadu/api-interfaces/models";
// TODO : import Criminal model

export class Operational_places 
    extends Model<IOperational_places, IOperational_placesInput> implements IOperational_places {
    id: string;
    criminal: string;
    state: string;
    district: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;
}

Operational_places.init(
    {
        id: 
        {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        criminal:
        {
            type: DataTypes.UUID,
            allowNull: false
        },
        state:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        district:
        {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    },
    {
        sequelize: db,
        tableName: "operational_places",
        timestamps: true
    }
);

// TODO - Add criminal as foreign key to criminal table
