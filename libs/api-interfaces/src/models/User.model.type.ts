import { Optional } from 'sequelize';

export interface IUser {
	id: string;
	police_station: string;
	name: string;
	email: string;
	phone: string;
	password: string;
	designation: string;
	createdAt: Date;
	updatedAt: Date;
}

export type IUserInput = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;
