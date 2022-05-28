import {
	IActiveCase,
	IActiveCaseInput,
	IAddress,
	IAddressInput,
	IAssociate,
	IAssociateInput,
	IBond,
	IBondInput,
	ICase,
	ICaseInput,
	ICriminal,
	ICriminalInput,
	IFamily,
	IFamilyInput,
	ILastArrest,
	ILastArrestInput,
	ILinks,
	ILinksInput,
	IModusOperandi,
	IOccupation,
	IOperationalPlace,
	IOperationalPlaceInput,
	IVehicle,
	IVehicleInput
} from '../models';

export interface CreateCriminalDto extends ICriminalInput {
	modus_operandi: string[];
	cases: CaseDto[];
	links: LinkDto[];
	family_members: FamilyMemberDto[];
	operational_places: OpPlaceDto[];
	bonds: BondDto[];
	occupation: string[];
	addresses: AddressDto[];
	associates: AssociatesDto[];
	vehicles: VehicleDto[];
}

export interface UpdateCriminalDto extends ICriminalInput {
	modus_operandi: string[];
	cases: CaseDto[];
	links: LinkDto[];
	family_members: FamilyMemberDto[];
	operational_places: OpPlaceDto[];
	bonds: BondDto[];
	occupation: string[];
	addresses: AddressDto[];
	associates: AssociatesDto[];
	vehicles: VehicleDto[];
	id: string;
}

export type UpdateCriminalPersonalDetailsDto = Partial<ICriminalInput>;

export type LinkDto = Omit<ILinksInput, 'criminal'>;
export type FamilyMemberDto = Omit<IFamilyInput, 'criminal'>;
export type LastArrestDto = Omit<ILastArrestInput, 'criminal'>;
export type OpPlaceDto = Omit<IOperationalPlaceInput, 'criminal'>;
export type BondDto = Omit<IBondInput, 'criminal'>;
export type AddressDto = Omit<IAddressInput, 'criminal'>;
export type VehicleDto = Omit<IVehicleInput, 'criminal'>;
export type AssociatesDto = Omit<IAssociateInput, 'criminal'>;
export interface CaseDto extends Omit<ICaseInput, 'criminal'>, Omit<IActiveCaseInput, 'criminal'> {
	is_active: boolean;
}

export interface CriminalDto extends ICriminal {
	activeCases: (Omit<IActiveCase, 'criminal' | 'case'> & Omit<ICase, 'criminal'>)[];
	addresses: Omit<IAddress, 'criminal'>[];
	associates: Omit<IAssociate, 'criminal'>[];
	familyMembers: Omit<IFamily, 'criminal'>[];
	cases: Omit<ICase, 'criminal'>[];
	links: Omit<ILinks, 'criminal'>[];
	lastArrest: Omit<ILastArrest, 'criminal'>;
	modusOperandi: Omit<IModusOperandi, 'criminal'>[];
	operationalPlaces: Omit<IOperationalPlace, 'criminal'>[];
	vehicles: Omit<IVehicle, 'criminal'>[];
	occupation: Omit<IOccupation, 'criminal'>[];
	bonds: Omit<IBond, 'criminal'>[];
}

export type SortableCriminalParameters = keyof Pick<
	ICriminalInput,
	'name' | 'alias_name' | 'category' | 'hs_number' | 'height' | 'dob' | 'grade'
>;
export type FilterableCriminalParams = Pick<
	ICriminalInput,
	'caste' | 'category' | 'grade' | 'marital_status' | 'religion' | 'is_goondas' | 'present_status'
>;

export type ListCriminalsQueryDto = {
	page: number;
	count: number;
	q?: string;
	f?: Partial<FilterableCriminalParams>[];
	s?: { key: SortableCriminalParameters; order: 'ASC' | 'DESC' };
};
