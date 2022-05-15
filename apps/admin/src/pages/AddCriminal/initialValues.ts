import {
	AddressDto,
	AssociatesDto,
	CaseDto,
	CreateCriminalDto,
	FamilyMemberDto,
	LastArrestDto,
	LinkDto,
	OpPlaceDto,
	VehicleDto
} from '@kaiyeadu/api-interfaces/dtos';

const addressSchema: AddressDto[] = [
	{
		type: 'Native' || 'Present' || 'Other',
		line1: '',
		line2: '',
		area: '',
		city: '',
		state: ''
	}
];

const family_membersSchema: FamilyMemberDto[] = [
	{
		name: '',
		relation:
			'Brother' ||
			'Daughter' ||
			'Father' ||
			'Mother' ||
			'Other' ||
			'Sister' ||
			'Son' ||
			'Spouse',
		description: '',
		occupation: ''
	}
];

const operationPlacesSchema: OpPlaceDto[] = [
	{
		state: '',
		district: ''
	}
];

const associatesSchema: AssociatesDto[] = [
	{
		name: '',
		father_name: '',
		location: '',
		gender: 'Female' || 'Male' || 'Other' || 'Transgender'
	}
];

const vehicleSchema: VehicleDto[] = [{ type: 'Two-Wheeler', reg_no: '', description: '' }];

const lastArrestSchema: Omit<Partial<LastArrestDto>, 'date'> & {
	date: string;
} = {
	crime_number: '',
	section: '',
	date: new Date().toISOString().split('T')[0],
	kind: ''
};

const bondSchema = [
	{
		bound_down_details: '',
		details: '',
		expiry: new Date().toISOString().split('T')[0],
		is_active: true,
		period: 1,
		type: '110CRPC'
	}
];

const linkSchema: LinkDto[] = [
	{
		name: '',
		father_name: '',
		alias_name: '',
		city: '',
		description: ''
	}
];

const caseDetailsSchema: Omit<Partial<CaseDto>, 'last_hearing' | 'next_hearing' | 'date'> &
	{
		accused_attend_status: true | false;
		is_active: true | false;
		last_hearing: string;
		next_hearing: string;
		date: string;
	}[] = [
	{
		police_station: '',
		under_section: 'gffdg',
		court_name: '',
		crime_number: '',
		stage: '',
		last_hearing: new Date().toISOString().split('T')[0],
		next_hearing: new Date().toISOString().split('T')[0],
		accused_attend_status: true,
		remarks: '',
		date: new Date().toISOString().split('T')[0],
		hearing_description: '',
		is_active: true
	}
];

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
	last_arrest: Omit<Partial<LastArrestDto>, 'date'> & {
		date: string;
	};
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
	last_arrest: lastArrestSchema,
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
