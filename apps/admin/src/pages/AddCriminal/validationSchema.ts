import * as Yup from 'yup';

export const PersonalDetailsValidation = Yup.object({
	image_url: Yup.string().url(),
	name: Yup.string().required('Required'),
	alias_name: Yup.string(),
	father_name: Yup.string(),
	gender: Yup.string().oneOf(['Male', 'Female', 'Transgender', 'Other']).required('Required'),
	dob: Yup.date()
		.max(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18), 'Criminal must be a major')
		.required('Date of birth is required and must be 18 years or older'),
	religion: Yup.string(),
	caste: Yup.string(),
	marital_status: Yup.string().oneOf(['Unmarried', 'Married', 'Divorced', 'Widowed']),
	hs_number: Yup.string().required('Required'),
	height: Yup.number()
		.min(120, 'Height must be greater than 120')
		.max(250, 'Height must be less than 250'),
	identification_mark: Yup.string(),
	phone_number: Yup.number().min(4444444444).max(9999999999),
	modus_operandi: Yup.array().of(Yup.string())
});

export const AddressDetailsValidation = Yup.object({
	address: Yup.array().of(
		Yup.object().shape({
			type: Yup.string().oneOf(['Native', 'Present', 'Other']).required('Required'),
			line1: Yup.string(),
			line2: Yup.string(),
			area: Yup.string(),
			city: Yup.string(),
			state: Yup.string()
		})
	),
	familyDetails: Yup.array().of(
		Yup.object().shape({
			name: Yup.string(),
			relation: Yup.string()
				.oneOf([
					'Brother',
					'Daughter',
					'Father',
					'Mother',
					'Other',
					'Sister',
					'Son',
					'Spouse'
				])
				.required(),
			description: Yup.string(),
			occupation: Yup.string()
		})
	)
});

export const OtherDetailsValidation = Yup.object({
	category: Yup.string().oneOf(['HS', 'OCIU']),
	grade: Yup.string().oneOf(['A_PLUS', 'A', 'B', 'C']),
	occupation: Yup.array().of(Yup.string()),
	last_arrest: Yup.object().shape({
		crime_number: Yup.string(),
		section: Yup.string(),
		date: Yup.date(),
		kind: Yup.string()
	}),
	advocate_name: Yup.string(),
	bank_account_number: Yup.string(),
	vehicles: Yup.array().of(
		Yup.object().shape({
			type: Yup.string().required('Required'),
			reg_no: Yup.string(),
			description: Yup.string()
		})
	),
	present_status: Yup.string(),
	is_goondas: Yup.string(),
	operationalPlaces: Yup.array().of(
		Yup.object().shape({
			state: Yup.string(),
			district: Yup.string()
		})
	),
	remarks: Yup.string(),
	bonds: Yup.array().of(
		Yup.object().shape({
			bound_down_details: Yup.string(),
			details: Yup.string(),
			expiry: Yup.string(),
			is_active: Yup.string(),
			period: Yup.number(),
			type: Yup.string().oneOf(['110CRPC', '109CRPC', '107CRPC'])
		})
	),
	links: Yup.array().of(
		Yup.object().shape({
			name: Yup.string(),
			father_name: Yup.string(),
			alias_name: Yup.string(),
			city: Yup.string(),
			description: Yup.string()
		})
	)
});

export const CaseDetailsValidation = Yup.object({
	police_station: Yup.string().required('Required'),
	crime_number: Yup.string().required('Required'),
	under_section: Yup.string().required('Required'),
	stage: Yup.string().required('Required'),
	remarks: Yup.string(),
	date: Yup.date().required(),
	is_active: Yup.string().required('Required'),
	court_name: Yup.string(),
	last_hearing: Yup.date(),
	next_hearing: Yup.date(),
	hearing_description: Yup.string(),
	accused_attend: Yup.boolean()
});
