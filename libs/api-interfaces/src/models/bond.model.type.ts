export interface IBond {
	id: string;
	criminal: string;
	details: string;
	type: string; // todo: probably enum?
	period: number;

	createdAt: Date;
	updatedAt: Date;
}

export type IBondInput = Omit<IBond, 'id' | 'createdAt' | 'updatedAt'>;
