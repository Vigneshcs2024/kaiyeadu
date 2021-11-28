import { Optional } from "sequelize";

export interface IVehicle {
    id: string;
    criminal: string;
    type: string;
    reg_no: string;
    description: string;

    createdAt: Date;
    updatedAt: Date;
}

export type IVehicleInput = Optional<IVehicle, "id" | "criminal" | "createdAt" | "updatedAt">;
