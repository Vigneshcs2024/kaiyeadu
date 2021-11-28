import { Optional } from 'sequelize';

export interface IPoliceStation {
	id: string;
	name: string;
	area: string;
	district: string;
	createdAt: Date;
	updatedAt: Date;
}

export type IPoliceStationInput = Optional<IPoliceStation, 'id' | 'createdAt' | 'updatedAt'>;
