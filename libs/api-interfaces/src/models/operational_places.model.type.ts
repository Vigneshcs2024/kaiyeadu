import { Optional } from "sequelize";

export interface IOperational_places {
    id: string;
    criminal: string;
    state: string;
    district: string;

    createdAt: Date;
    updatedAt: Date;
}

export type IOperational_placesInput = Optional<IOperational_places, "id" | "criminal" | "createdAt" | "updatedAt">;
