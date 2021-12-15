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
	name: string;
	category: ICriminalInput['category'];
	grade: ICriminalInput['grade'];
	alias_name: string;
	father_name: string;
	dob: Date;
	phone_number: number;
	religion: string; // make it enum
	caste: string; // also enum
	hs_number: string;
	height: number;
	identification_mark: string;
	marital_status: string; // enum?
	advocate_name: string;
	bank_account_number: string;
	present_status: string;
	image_url: string;
	is_goondas: boolean;
	remarks: string;

	modus_operandi: string[];
	cases: CaseDto[];
	links: LinkDto[];
	family_members: FamilyMemberDto[];
	last_arrest: LastArrestDto;
	operational_places: OpPlaceDto[];
	bonds: BondDto[];
	occupation: string[];
	addresses: AddressDto[];
	associates: AssociatesDto[];
	vehicles: VehicleDto[];
}

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
