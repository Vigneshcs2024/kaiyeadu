import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import styled from 'styled-components';

import { BackgroundContainer } from '@kaiyeadu/ui/components';
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

export function AddCriminal() {
	const [step, setStep] = useState<number>(1);

	const personalDetailsFormik = useFormik({
		initialValues: initialPersonalDetails,
		validationSchema: PersonalDetailsValidation,
		onSubmit: () => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const addressDetailsFormik = useFormik({
		initialValues: initialAddressDetails,
		validationSchema: AddressDetailsValidation,
		onSubmit: () => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const otherDetailsFormik = useFormik({
		initialValues: initialOtherDetails,
		validationSchema: OtherDetailsValidation,
		onSubmit: () => {
			setStep(old => (old === 4 ? 1 : old + 1));
		}
	});
	const caseDetailsFormik = useFormik({
		initialValues: initialCaseDetails,
		validationSchema: CaseDetailsValidation,
		onSubmit: () => {
			setStep(1);
		}
	});

	useEffect(() => {
		const formikValues = {
			...personalDetailsFormik.values,
			...addressDetailsFormik.values,
			...otherDetailsFormik.values,
			...caseDetailsFormik.values
		};
	}, [personalDetailsFormik, addressDetailsFormik, otherDetailsFormik, caseDetailsFormik]);

	return (
		<BackgroundContainer pageTitle='Add Criminal'>
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
