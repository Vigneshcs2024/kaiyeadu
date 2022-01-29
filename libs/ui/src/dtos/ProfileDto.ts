import {
	IActiveCase,
	IAddress,
	IAssociate,
	IBond,
	ICase,
	IFamily,
	ILastArrest,
	ILinks,
	IModusOperandi,
	IOccupation,
	IOperationalPlace,
	IVehicle
} from '@kaiyeadu/api-interfaces/models';

type DatetoString = {
	createdAt: string;
	updatedAt: string;
};

type ActiveCase = Omit<IActiveCase, 'case' | 'createdAt' | 'updatedAt' | 'accused_attend_status'>;
type Case = Omit<ICase, 'criminal' | 'createdAt' | 'updatedAt'>;
type Address = Omit<IAddress, 'criminal' | 'createdAt' | 'updatedAt' | 'type'>;
type Associate = Omit<IAssociate, 'criminal' | 'createdAt' | 'updatedAt' | 'gender'>;
type FamilyMember = Omit<IFamily, 'criminal' | 'createdAt' | 'updatedAt' | 'relation'>;
type Link = Omit<ILinks, 'criminal' | 'createdAt' | 'updatedAt'>;
type LastArrest = Omit<ILastArrest, 'criminal' | 'createdAt' | 'updatedAt' | 'date'>;
type ModusOperandi = Omit<IModusOperandi, 'criminal' | 'createdAt' | 'updatedAt'>;
type OpPlaces = Omit<IOperationalPlace, 'criminal' | 'createdAt' | 'updatedAt'>;
type Vehicle = Omit<IVehicle, 'criminal' | 'createdAt' | 'updatedAt' | 'type'>;
type Occupation = Omit<IOccupation, 'criminal' | 'createdAt' | 'updatedAt' | 'type'>;
type Bond = Omit<
	IBond,
	'criminal' | 'createdAt' | 'updatedAt' | 'type' | 'is_active' | 'bound_down_details' | 'expiry'
>;

export interface ActiveCaseDto extends ActiveCase, DatetoString {
	accused_attend_status: number;
	police_station: string;
}

export interface CaseDto extends Case, DatetoString {}

export interface AddressDto extends Address, DatetoString {
	type: string;
}

export interface AssociateDto extends Associate, DatetoString {
	gender: string;
}

export interface FamilyMemberDto extends FamilyMember, DatetoString {
	relation: string;
}

export interface LinkDto extends Link, DatetoString {}

export interface LastArrestDto extends LastArrest, DatetoString {
	date: string;
}

export interface ModusOperandiDto extends ModusOperandi, DatetoString {}

export interface OpPlacesDto extends OpPlaces, DatetoString {}

export interface VehicleDto extends Vehicle, DatetoString {
	type: string;
}

export interface OccupationDto extends Occupation, DatetoString {}

export interface BondDto extends Bond, DatetoString {
	is_active: string | number;
	bound_down_details: string | null;
	expiry: string;
}

export interface CriminalRecordDto {
	id: string;
	category: string;
	grade: string;
	name: string;
	alias_name: string;
	father_name: string;
	dob: string;
	gender: string;
	phone_number: string;
	religion: string;
	caste: string;
	hs_number: string;
	height: number;
	identification_mark: string;
	marital_status: string;
	advocate_name: string;
	bank_account_number: string | null;
	present_status: string;
	image_url: string;
	is_goondas: number;
	remarks: string;
	activeCases: ActiveCaseDto[];
	cases: CaseDto[];
	addresses: AddressDto[];
	associates: AssociateDto[];
	familyMembers: FamilyMemberDto[];
	links: LinkDto[];
	lastArrest: LastArrestDto;
	modusOperandi: ModusOperandiDto[];
	operationalPlaces: OpPlacesDto[];
	vehicles: VehicleDto[];
	occupation: OccupationDto[];
	bonds: BondDto[];
}
