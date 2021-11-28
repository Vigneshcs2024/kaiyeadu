import { Optional } from "sequelize/dist";

export interface IAddress {
    id: string;
    criminal: string;
    type: string;
    line1: string;
    line2: string;
    area: string;
    city: string;
    state: string;

    createdAt: Date;
	updatedAt: Date;   
}

export type IAddressInput = Optional<IAddress, "id" | "criminal" | "createdAt" | "updatedAt">;
