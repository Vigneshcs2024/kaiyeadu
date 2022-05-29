import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';

import { Stepper } from './Stepper';
import { PersonalDetails } from './PersonalDetails';
import { AddressDetails } from './AddressDetails';
import { OtherDetails } from './OtherDetails';
import { CaseDetails } from './CaseDetails';
import {
	initialPersonalDetails,
	initialAddressDetails,
	initialOtherDetails,
	initialCaseDetails
} from './initialValues';
import {
	PersonalDetailsValidation,
	AddressDetailsValidation,
	OtherDetailsValidation,
	CaseDetailsValidation
} from './validationSchema';

import { useRequest } from '@kaiyeadu/hooks';
import { BackgroundContainer, Loader } from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { CommonObject, CustomAxiosError, SelectOption } from '@kaiyeadu/ui/interface';
import { CriminalRecordDto } from '@kaiyeadu/ui/dtos';
import { AssociatesDto } from '@kaiyeadu/api-interfaces/dtos';
import { getFullImageURL } from '@kaiyeadu/ui/functions';

export function EditCriminal() {
	const [step, setStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState(false);
	const [stationList, setStationList] = useState<SelectOption[]>([]);
	const [image, setImage] = useState<File>();
	const [imageURL, setImageURL] = useState('');

	const { request } = useRequest();
	const navigate = useNavigate();

	const [personalDetails, setPersonalDetails] = useState(initialPersonalDetails);
	const [addressDetails, setAddressDetails] = useState(initialAddressDetails);
	const [caseDetails, setCaseDetails] = useState(initialCaseDetails);
	const [otherDetails, setOtherDetails] = useState(initialOtherDetails);

	const { state: data } = useLocation();

	useEffect(() => {
		const {
			id,
			category,
			grade,
			name,
			alias_name,
			father_name,
			dob,
			gender,
			phone_number,
			religion,
			caste,
			hs_number,
			height,
			identification_mark,
			marital_status,
			advocate_name,
			bank_account_number,
			present_status,
			image_url,
			is_goondas,
			remarks,
			activeCases,
			cases,
			addresses,
			associates,
			familyMembers,
			links,
			lastArrest,
			modusOperandi,
			operationalPlaces,
			vehicles,
			occupation,
			bonds
		} = data as CriminalRecordDto;
		const modus_operandi = modusOperandi.map(v => v.type);
		setImageURL(getFullImageURL(image_url ?? ''));
		setPersonalDetails({
			name,
			marital_status,
			alias_name,
			hs_number,
			father_name,
			height,
			gender,
			identification_mark,
			dob,
			phone_number: +phone_number,
			religion,
			caste,
			modus_operandi
		});
		setAddressDetails({ addresses, family_members: familyMembers });
		setCaseDetails({
			cases: [
				...cases.map(v => ({ ...v, is_active: false })),
				...activeCases.map(v => ({ ...v, is_active: true }))
			]
		});
		setOtherDetails({
			advocate_name,
			grade,
			bank_account_number: bank_account_number as string,
			is_goondas: is_goondas ? 'true' : 'false',
			present_status,
			operational_places: operationalPlaces,
			vehicles,
			occupation: occupation.map(v => v.name),
			category,
			associates,
			remarks,
			bonds: bonds.map(v => ({
				...v,
				bound_down_details: v.bound_down_details as string,
				is_active: v.is_active ? true : false
			})),
			links
		});
	}, [data]);

	const personalDetailsFormik = useFormik({
		enableReinitialize: true,
		initialValues: personalDetails,
		validationSchema: PersonalDetailsValidation,
		onSubmit: async values => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const addressDetailsFormik = useFormik({
		enableReinitialize: true,
		initialValues: addressDetails,
		validationSchema: AddressDetailsValidation,
		onSubmit: values => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const otherDetailsFormik = useFormik({
		enableReinitialize: true,
		initialValues: otherDetails,
		validationSchema: OtherDetailsValidation,
		onSubmit: values => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});

	const caseDetailsFormik = useFormik({
		enableReinitialize: true,
		initialValues: caseDetails,
		validationSchema: CaseDetailsValidation,
		onSubmit: async values => {
			setIsLoading(true);
			let image_url = imageURL;
			try {
				setIsLoading(true);
				if (image) {
					const formData = new FormData();
					const config = {
						headers: {
							'content-type': 'multipart/form-data'
						}
					};
					formData.append('image', image);
					const res = await request.post('/upload/image', formData, config);
					image_url = '/static/image/' + res.data.result.path;
				}

				await request.patch(Requests.CRIMINAL_UPDATE_PERSONAL + data.id, {
					...personalDetailsFormik.values,
					...addressDetailsFormik.values,
					...otherDetailsFormik.values,
					addresses: addressDetailsFormik.values.addresses.map(v => ({
						type: v.type,
						line1: v.line1,
						line2: v.line2,
						area: v.area,
						city: v.city,
						state: v.state
					})),
					associates: (otherDetailsFormik.values.associates as AssociatesDto[]).map(
						v => ({
							father_name: v.father_name,
							gender: v.gender,
							location: v.location,
							name: v.name
						})
					),
					bonds: otherDetailsFormik.values.bonds.map(v => ({
						details: v.details,
						type: v.type,
						period: v.period,
						is_active: v.is_active,
						bound_down_details: v.bound_down_details,
						expiry: v.expiry
					})),
					family_members: addressDetailsFormik.values.family_members.map(v => ({
						name: v.name,
						relation: v.relation,
						description: v.description,
						occupation: v.occupation
					})),
					cases: caseDetailsFormik.values.cases.map(v => ({
						police_station: stationList.find(st => st.label === v.police_station)
							?.value,
						crime_number: v.crime_number,
						under_section: v.under_section,
						stage: v.stage,
						remarks: v.remarks,
						date: v.date,
						court_name: v.court_name,
						last_hearing: v.last_hearing,
						next_hearing: v.next_hearing,
						hearing_description: v.hearing_description,
						accused_attend_status: v.accused_attend_status ? true : false,
						is_active: v.is_active
					})),

					links: otherDetailsFormik.values.links?.map(v => ({
						name: v.name,
						alias_name: v.alias_name,
						father_name: v.father_name,
						city: v.city,
						description: v.description
					})),
					operational_places: otherDetails.operational_places?.map(v => ({
						state: v.state,
						district: v.district
					})),
					vehicles: otherDetails.vehicles?.map(v => ({
						description: v.description,
						reg_no: v.reg_no,
						type: v.type
					})),
					image_url
				});

				setIsLoading(false);
				toast.success('Criminal record updated successfully !');
				setTimeout(() => {
					navigate(-1);
				}, 1000);
			} catch (error) {
				const err = error as CustomAxiosError;
				err.handleAxiosError?.();
				setIsLoading(false);
			}
		}
	});

	const getData = async () => {
		try {
			const res = await request.get(Requests.STATION_LIST);
			setStationList(old => [
				...old,
				...res.data.result.stations.map((val: CommonObject) => ({
					label: val.name,
					value: val.id
				}))
			]);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
		}
	};

	const memoizedGetData = useCallback(getData, [request]);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	return (
		<BackgroundContainer pageTitle='Edit Criminal'>
			{isLoading ? <Loader /> : null}
			<Stepper step={step} />
			<Layout>
				{step === 1 ? (
					<PersonalDetails
						formik={personalDetailsFormik}
						step={step}
						setStep={setStep}
						setImage={setImage}
						imageURL={imageURL}
					/>
				) : step === 2 ? (
					<AddressDetails formik={addressDetailsFormik} setStep={setStep} />
				) : step === 3 ? (
					<OtherDetails formik={otherDetailsFormik} setStep={setStep} />
				) : (
					<CaseDetails
						formik={caseDetailsFormik}
						lastArrestFormik={otherDetailsFormik}
						step={step}
						setStep={setStep}
						stationList={stationList}
					/>
				)}
			</Layout>
		</BackgroundContainer>
	);
}

const Layout = styled.main`
	padding: 2rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	color: ${p => p.theme.white};
`;
