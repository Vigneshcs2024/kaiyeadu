import { useNavigate } from 'react-router-dom';
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

export function AddCriminal() {
	const [step, setStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState(false);
	const [stationList, setStationList] = useState<SelectOption[]>([]);
	const [image, setImage] = useState<File>();

	const { request } = useRequest();
	const navigate = useNavigate();

	const personalDetailsFormik = useFormik({
		initialValues: initialPersonalDetails,
		validationSchema: PersonalDetailsValidation,
		onSubmit: values => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const addressDetailsFormik = useFormik({
		enableReinitialize: true,
		initialValues: initialAddressDetails,
		validationSchema: AddressDetailsValidation,
		onSubmit: values => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const otherDetailsFormik = useFormik({
		initialValues: initialOtherDetails,
		validationSchema: OtherDetailsValidation,
		onSubmit: values => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});

	const caseDetailsFormik = useFormik({
		initialValues: initialCaseDetails,
		validationSchema: CaseDetailsValidation,
		onSubmit: async values => {
			setIsLoading(true);
			try {
				const formData = new FormData();
				const config = {
					headers: {
						'content-type': 'multipart/form-data'
					}
				};
				let image_url = '';
				if (image) {
					formData.append('image', image);
					const res = await request.post('/upload/image', formData, config);
					image_url = '/static/image/' + res.data.result.path;
				}

				const res = await request.post(Requests.CRIMINAL_CREATE, {
					...personalDetailsFormik.values,
					...addressDetailsFormik.values,
					...otherDetailsFormik.values,
					cases: values.cases.map(v => ({
						...v,
						police_station: stationList.find(st => st.label === v.police_station)?.value
					})),
					image_url
				});
				setIsLoading(false);
				toast.success(res.data.message);
				setTimeout(() => {
					navigate('/criminals');
				}, 2000);
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
		<BackgroundContainer pageTitle='Add Criminal'>
			{isLoading ? <Loader /> : null}
			<Stepper step={step} />
			<Layout>
				{step === 1 ? (
					<PersonalDetails
						formik={personalDetailsFormik}
						step={step}
						setStep={setStep}
						setImage={setImage}
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
