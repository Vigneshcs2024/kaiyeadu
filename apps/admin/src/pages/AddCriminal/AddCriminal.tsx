import toast from 'react-hot-toast';
import { useState } from 'react';
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
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export function AddCriminal() {
	const [step, setStep] = useState<number>(1);
	const [isLoading, setIsLoading] = useState(false);

	const { request } = useRequest();

	const personalDetailsFormik = useFormik({
		initialValues: initialPersonalDetails,
		validationSchema: PersonalDetailsValidation,
		onSubmit: values => {
			console.log(values);

			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const addressDetailsFormik = useFormik({
		enableReinitialize: true,
		initialValues: initialAddressDetails,
		validationSchema: AddressDetailsValidation,
		onSubmit: values => {
			console.log(values);
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const otherDetailsFormik = useFormik({
		initialValues: initialOtherDetails,
		validationSchema: OtherDetailsValidation,
		onSubmit: values => {
			console.log(values);
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});

	const caseDetailsFormik = useFormik({
		initialValues: initialCaseDetails,
		validationSchema: CaseDetailsValidation,
		onSubmit: async values => {
			setIsLoading(true);
			try {
				const res = await request.post(Requests.CRIMINAL_CREATE, {
					...personalDetailsFormik.values,
					...addressDetailsFormik.values,
					...otherDetailsFormik.values,
					...caseDetailsFormik.values
				});
				setIsLoading(false);
				toast.success(res.data.message);
			} catch (error) {
				const err = error as CustomAxiosError;
				err.handleAxiosError?.();
				setIsLoading(false);
			}
		}
	});

	return (
		<BackgroundContainer pageTitle='Add Criminal'>
			{isLoading ? <Loader /> : null}
			<Stepper step={step} />
			<Layout>
				{step === 1 ? (
					<PersonalDetails formik={personalDetailsFormik} step={step} setStep={setStep} />
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
