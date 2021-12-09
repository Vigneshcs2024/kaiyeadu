export interface IPoliceStation {
	id: string;
	name: string;
	area: string;
	district: string;
	createdAt: Date;
	updatedAt: Date;
}

export type IPoliceStationInput = Omit<IPoliceStation, 'id' | 'createdAt' | 'updatedAt'>;
