export interface IUser {
	id: string;
	name: string;
	gpf?: string;
	police_station: string;
	email: string;
	phone: string;
	password?: string;
	designation: string;
	role: 'user' | 'admin' | 'master';
	createdAt: Date;
	updatedAt: Date;
}

export type IUserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
