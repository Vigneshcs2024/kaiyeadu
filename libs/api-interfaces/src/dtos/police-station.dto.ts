import { IPoliceStationInput } from '../models';

export type CreatePSDto = IPoliceStationInput;

export type PSFilterableParams = Pick<IPoliceStationInput, 'area' | 'district'>;
export type PSSortableParams = keyof Pick<IPoliceStationInput, 'name' | 'area' | 'district'>;

export type PsFilteredListDto = {
	page?: number;
	count?: number;
	q?: string;
	f?: Partial<PSFilterableParams>;
	s?: { key: PSSortableParams; order: 'ASC' | 'DESC' };
};
