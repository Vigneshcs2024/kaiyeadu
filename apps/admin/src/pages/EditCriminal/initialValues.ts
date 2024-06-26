import {
	AddressDto,
	AssociatesDto,
	CreateCriminalDto,
	FamilyMemberDto,
	LinkDto,
	OpPlaceDto,
	VehicleDto
} from '@kaiyeadu/api-interfaces/dtos';

const addressSchema: AddressDto[] = [];

const family_membersSchema: FamilyMemberDto[] = [];

const operationPlacesSchema: OpPlaceDto[] = [];

const associatesSchema: AssociatesDto[] = [];

const vehicleSchema: VehicleDto[] = [];

const bondSchema: {
	bound_down_details: string;
	details: string;
	expiry: string;
	is_active: boolean;
	period: number;
	type: string;
}[] = [];

const linkSchema: LinkDto[] = [];

const caseDetailsSchema: {
	police_station: string;
	under_section: string;
	court_name: string;
	crime_number: string;
	stage: string;
	last_hearing: string;
	next_hearing: string;
	accused_attend_status: boolean;
	hearing_description: string;
	remarks: string;
	is_active: boolean;
	date: string;
}[] = [];

export const initialPersonalDetails: Omit<Partial<CreateCriminalDto>, 'dob'> & {
	dob: string;
} = {
	image_url: '',
	name: '',
	alias_name: '',
	father_name: '',
	gender: 'Male',
	dob: new Date().toISOString().split('T')[0],
	religion: '',
	caste: '',
	marital_status: 'Married',
	hs_number: '',
	height: 170,
	identification_mark: '',
	phone_number: 9876343421,
	modus_operandi: []
};

export const initialAddressDetails = {
	addresses: addressSchema,
	family_members: family_membersSchema
};

export const initialOtherDetails: Omit<
	Partial<CreateCriminalDto>,
	'is_goondas' | 'last_arrest' | 'bonds'
> & {
	is_goondas: 'true' | 'false';
	bonds: {
		bound_down_details: string;
		details: string;
		expiry: string;
		is_active: boolean;
		period: number;
		type: string;
	}[];
} = {
	category: 'HS',
	grade: 'A_PLUS',
	occupation: [],
	associates: associatesSchema,
	advocate_name: '',
	bank_account_number: '',
	vehicles: vehicleSchema,
	present_status: 'Active',
	is_goondas: 'true',
	operational_places: operationPlacesSchema,
	remarks: '',
	bonds: bondSchema,
	links: linkSchema
};

export const initialCaseDetails = { cases: caseDetailsSchema };
