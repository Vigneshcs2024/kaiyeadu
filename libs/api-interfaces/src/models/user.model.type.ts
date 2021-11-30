export interface IUser {
	id: string;
	police_station: string;
	name: string;
	email: string;
	phone: string;
	password: string;
	designation: string;
	role: 'user' | 'admin' | 'master';
	createdAt: Date;
	updatedAt: Date;
}

export type IUserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
