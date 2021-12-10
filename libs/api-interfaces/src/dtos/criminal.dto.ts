import {
	IActiveCaseInput,
	IAddressInput,
	IAssociatesInput,
	IBondInput,
	ICaseInput,
	ICriminalInput,
	IFamilyInput,
	ILinksInput,
	IOccupationInput,
	IOperationalPlacesInput,
	IVehicleInput
} from '../models';

export interface CreateCriminalDto extends ICriminalInput {
	category: string; // todo: enum???? hs/ociu??
	name: string;
	alias_name: string;
	father_name: string;
	dob: Date;
	phone_number: number;
	religion: string;
	caste: string;
	hs_number: number;
	height: number;
	identification_mark: string;
	marital_status: string;
	advocate_name: string;
	bank_account_number: string;
	present_status: string;
	present_location: string;
	image_url: string;
	isGoondas: boolean;
	remarks: string;

	modus_operandi: string[];
	case: CaseDto[];
	active_cases: ActiveCaseDto[];
	links: LinkDto[];
	family_members: FamilyMemberDto[];
	operational_places: OpPlaceDto[];
	bond: BondDto;
	occupation: OccupationDto[];
	present_address: AddressDto;
	associates: AssociatesDto[];
	vehicles: VehicleDto[];
}

type CaseDto = Omit<ICaseInput, 'criminal' | 'police_station'>;
type ActiveCaseDto = Omit<IActiveCaseInput, 'criminal' | 'case'>;
type LinkDto = Omit<ILinksInput, 'criminal'>;
type FamilyMemberDto = Omit<IFamilyInput, 'criminal'>;
type OpPlaceDto = Omit<IOperationalPlacesInput, 'criminal'>;
type BondDto = Omit<IBondInput, 'criminal'>;
type OccupationDto = Omit<IOccupationInput, 'criminal'>;
type AddressDto = Omit<IAddressInput, 'criminal'>;
type VehicleDto = Omit<IVehicleInput, 'criminal'>;

interface AssociatesDto extends Omit<IAssociatesInput, 'criminal' | 'occupation'> {
	occupation: OccupationDto[];
	name: string;
	district: string;
	state: string;
}
