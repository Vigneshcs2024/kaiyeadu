export interface IBond {
	id: string;
	criminal: string;
	details: string;
	type: '110CRPC' | '109CRPC' | '107CRPC';
	period: number;
	is_active: boolean;
	bound_down_details: string;
	expiry: Date;

	createdAt: Date;
	updatedAt: Date;
}

export type IBondInput = Omit<IBond, 'id' | 'createdAt' | 'updatedAt'>;
