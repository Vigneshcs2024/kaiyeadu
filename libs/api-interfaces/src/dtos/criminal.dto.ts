import {
	IActiveCaseInput,
	IAddressInput,
	IAssociateInput,
	IBondInput,
	ICaseInput,
	ICriminalInput,
	IFamilyInput,
	ILastArrestInput,
	ILinksInput,
	IOccupationInput,
	IOperationalPlaceInput,
	IVehicleInput
} from '../models';

export interface CreateCriminalDto extends ICriminalInput {
	category: ICriminalInput['category'];
	name: string;
	alias_name: string;
	father_name: string;
	dob: Date;
	phone_number: number;
	religion: string;
	caste: string;
	hs_number: string;
	height: number;
	identification_mark: string;
	marital_status: string;
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
	bond: BondDto;
	occupation: OccupationDto[];
	present_address: AddressDto[];
	associates: AssociatesDto[];
	vehicles: VehicleDto[];
}

export type LinkDto = Omit<ILinksInput, 'criminal'>;
export type FamilyMemberDto = Omit<IFamilyInput, 'criminal'>;
export type LastArrestDto = Omit<ILastArrestInput, 'criminal'>;
export type OpPlaceDto = Omit<IOperationalPlaceInput, 'criminal'>;
export type BondDto = Omit<IBondInput, 'criminal'>;
export type OccupationDto = Omit<IOccupationInput, 'criminal'>;
export type AddressDto = Omit<IAddressInput, 'criminal'>;
export type VehicleDto = Omit<IVehicleInput, 'criminal'>;
export type AssociatesDto = Omit<IAssociateInput, 'criminal'>;
export interface CaseDto extends Omit<ICaseInput, 'criminal'>, IActiveCaseInput {
	is_active: boolean;
}
