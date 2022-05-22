export interface IVehicle {
	id: string;
	criminal: string;
	type: 'Two-Wheeler' | 'Three-Wheeler' | 'Four-Wheeler' | 'Heavy Vehicle' | string;
	reg_no: string;
	description: string;

	createdAt: Date;
	updatedAt: Date;
}

export type IVehicleInput = Omit<IVehicle, 'id' | 'createdAt' | 'updatedAt'>;
