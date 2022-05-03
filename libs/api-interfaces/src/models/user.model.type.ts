import { designations, roles } from '../constants';

export interface IUser {
	id: string;
	name: string;
	gpf?: string;
	police_station: string;
	email: string;
	phone: number;
	password?: string;
	designation: typeof designations[number];
	role: typeof roles[number];
	createdAt: Date;
	updatedAt: Date;
}

export type IUserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
