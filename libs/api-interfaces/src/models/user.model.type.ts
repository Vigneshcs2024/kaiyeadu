export interface IUser {
	id: string;
	name: string;
	gpf?: string;
	police_station: string;
	email: string;
	phone: number;
	password?: string;
	designation: 'Gr II - PC' | 'Gr I - PC' | 'HC' | 'SSI' | 'SI' | 'Inspr' | 'DSP' | 'ADSP' | 'SP'
| 'DIG' | 'IG'
	role: 'user' | 'admin' | 'master';
	createdAt: Date;
	updatedAt: Date;
}

export type IUserInput = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;
