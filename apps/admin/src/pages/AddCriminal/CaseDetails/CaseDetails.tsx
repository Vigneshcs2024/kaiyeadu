import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormikProps, useFormik } from 'formik';
import * as Yup from 'yup';

import {
	AddItemButton,
	Button,
	CheckBox,
	DropDownList,
	RemoveGroupButton,
	TextField
} from '@kaiyeadu/ui/components';
import { initialCaseDetails, initialOtherDetails } from '../initialValues';
import { CaseDto, LastArrestDto } from '@kaiyeadu/api-interfaces/dtos';
import { theme } from '@kaiyeadu/ui/base';

interface FormikInterface {
	formik: FormikProps<typeof initialCaseDetails>;
	lastArrestFormik: FormikProps<typeof initialOtherDetails>;
	setStep: Dispatch<SetStateAction<number>>;
	step: number;
}

function LastArrestDetails({ formik }: { formik: FormikProps<typeof initialOtherDetails> }) {
	const initialValues: Omit<Partial<LastArrestDto>, 'date'> & {
		date: string;
	} = {
		crime_number: formik.values.last_arrest?.crime_number,
		date: new Date(
			formik.values.last_arrest?.date === undefined ? '' : formik.values.last_arrest?.date
		)
			.toISOString()
			.split('T')[0],
		kind: formik.values.last_arrest?.kind,
		section: formik.values.last_arrest?.section
	};

	const validationSchema = Yup.object().shape({
		crime_number: Yup.string().required('Required'),
		section: Yup.string().required('Required'),
		date: Yup.date()
			.min(new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18))
			.required('Date of birth is required and must be 18 years or older'),
		kind: Yup.string().required('Required')
	});

	const lastArrestFormik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: values => {
			formik.values.last_arrest = values;
		}
	});

	useEffect(() => {
		formik.values.last_arrest = lastArrestFormik.values;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastArrestFormik.values, formik.values]);

	return (
		<>
			<h2>Last Arrest Details</h2>
			<GridContainer>
				<div>
					<DropDownList
						label='Crime Number'
						id='crime_number'
						name='crime_number'
						items={['123', '456', '789', '100']}
						value={lastArrestFormik.values.crime_number}
						onChange={lastArrestFormik.handleChange}
						onBlur={lastArrestFormik.handleBlur}
						tip={
							lastArrestFormik.touched.crime_number &&
							lastArrestFormik.errors.crime_number
								? {
										content: lastArrestFormik.errors.crime_number,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						id='date'
						name='date'
						label='Date'
						type='date'
						value={new Date(lastArrestFormik.values.date).toISOString().split('T')[0]}
						onChange={lastArrestFormik.handleChange}
						onBlur={lastArrestFormik.handleBlur}
					/>
				</div>
				<div>
					<TextField
						id='kind'
						name='kind'
						label='Kind'
						type='text'
						value={lastArrestFormik.values.kind}
						onChange={lastArrestFormik.handleChange}
						onBlur={lastArrestFormik.handleBlur}
						tip={
							lastArrestFormik.touched.kind && lastArrestFormik.errors.kind
								? {
										content: lastArrestFormik.errors.kind,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						id='section'
						name='section'
						label='Section'
						type='text'
						value={lastArrestFormik.values.section}
						onChange={lastArrestFormik.handleChange}
						onBlur={lastArrestFormik.handleBlur}
						tip={
							lastArrestFormik.touched.section && lastArrestFormik.errors.section
								? {
										content: lastArrestFormik.errors.section,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
				</div>
			</GridContainer>
		</>
	);
}

export function CaseDetails({ formik, lastArrestFormik, setStep }: FormikInterface) {
	const [cases, setCases] = useState<
		Array<
			Omit<Partial<CaseDto>, 'last_hearing' | 'next_hearing' | 'date'> & {
				accused_attend_status: true | false;
				is_active: true | false;
				last_hearing: string;
				next_hearing: string;
				date: string;
			}
		>
	>(formik.values.case);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		index: number
	) => {
		const { name, value } = e.target;
		const list = [...cases];
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		list[index][name as keyof CaseDto] = value;
		setCases(list);
	};

	// handle click event of the Remove button
	const handleRemoveClick = (index: number) => {
		const list = [...cases];
		list.splice(index, 1);
		setCases(list);
	};

	// handle click event of the Add button
	const handleAddClick = () => {
		setCases(old => {
			return [
				...old,
				{
					police_station: '',
					under_section: '',
					court_name: '',
					crime_number: '',
					stage: '',
					last_hearing: new Date().toISOString().split('T')[0],
					next_hearing: new Date().toISOString().split('T')[0],
					accused_attend_status: true,
					hearing_description: '',
					remarks: '',
					is_active: true,
					date: new Date().toISOString().split('T')[0]
				}
			];
		});
	};

	const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const list = [...cases];
		if (e.target.name === 'accused_attend_status') {
			list[index].accused_attend_status = e.target.checked;
		} else {
			list[index].is_active = e.target.checked;
		}
		setCases(list);
	};

	useEffect(() => {
		formik.values.case = cases;
	}, [formik.values, cases]);
	return (
		<Container onSubmit={formik.handleSubmit}>
			<HeadingWithAddButton>
				<h2>Case Details</h2>
				<AddItemButton onClick={handleAddClick} />
			</HeadingWithAddButton>
			{cases.map((item, index) => {
				return (
					<div style={{ position: 'relative' }} key={index}>
						<CheckBox
							label='Is this case active?'
							id='is_active'
							name='is_active'
							checked={item.is_active}
							onChange={e => handleCheckBoxChange(e, index)}
						/>
						<CaseContainer>
							<div>
								<DropDownList
									label='Name of the Police Station'
									id='police_station'
									name='police_station'
									items={[
										'Mandaiyur PS',
										'Manachanallur PS',
										'Anna Nagar PS',
										'Thuvaakudi PS'
									]}
									value={item.crime_number}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='under_section'
									name='under_section'
									label='Under Section'
									type='text'
									value={item.under_section}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='court_name'
									name='court_name'
									label='Name of the Court'
									type='text'
									value={item.court_name}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='crime_number'
									name='crime_number'
									label='Crime Number'
									type='text'
									value={item.crime_number}
									onChange={e => handleInputChange(e, index)}
								/>

								<TextField
									id='last_hearing'
									name='last_hearing'
									label='Last Hearing'
									type='date'
									value={
										item.last_hearing
											? new Date(item.last_hearing)
													.toISOString()
													.split('T')[0]
											: new Date().toISOString().split('T')[0]
									}
									onChange={e => handleInputChange(e, index)}
								/>
								<CheckBox
									label='Have the accused attended the last hearing?'
									id='accused_attend_status'
									name='accused_attend_status'
									checked={item.accused_attend_status}
									onChange={e => handleCheckBoxChange(e, index)}
								/>
							</div>
							<div>
								<TextField
									id='date'
									name='date'
									label='Date'
									type='date'
									value={
										item.date
											? new Date(item.date).toISOString().split('T')[0]
											: new Date().toISOString().split('T')[0]
									}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='stage'
									name='stage'
									label='Stage'
									type='text'
									value={item.stage}
									onChange={e => handleInputChange(e, index)}
								/>

								<TextField
									id='hearing_description'
									name='hearing_description'
									label='Hearing Description'
									type='text'
									value={item.hearing_description}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='next_hearing'
									name='next_hearing'
									label='Next Hearing'
									type='date'
									value={
										item.next_hearing
											? new Date(item.next_hearing)
													.toISOString()
													.split('T')[0]
											: new Date().toISOString().split('T')[0]
									}
									onChange={e => handleInputChange(e, index)}
								/>
								<TextField
									id='remarks'
									name='remarks'
									label='Remarks'
									type='text'
									value={item.remarks}
									onChange={e => handleInputChange(e, index)}
								/>
							</div>
						</CaseContainer>
						<RemoveGroupButton
							style={{ top: '3rem', right: '-3rem' }}
							onClick={e => handleRemoveClick(index)}
						/>
					</div>
				);
			})}
			<LastArrestDetails formik={lastArrestFormik} />
			<ButtonContainer>
				<Button
					onClick={() => setStep(old => (old === 1 ? 4 : old - 1))}
					title='Prev'
					type='button'
				/>
				<Link to={Object.keys(formik.errors).length === 0 ? '/criminals' : ''}>
					<Button
						title='Submit'
						type='submit'
						isActive={Object.keys(formik.errors).length === 0}
					/>
				</Link>
			</ButtonContainer>
		</Container>
	);
}

const ButtonContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 4rem;
`;

const CaseContainer = styled.div`
	position: relative;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 4rem;
	grid-row-gap: 0;
	padding: 2rem 4rem 0;
	margin: 2rem auto;
	border: 1px solid ${props => props.theme.white};

	@media only screen and (max-width: 940px) {
		display: flex;
		flex-direction: column;
	}
`;

const Container = styled.form`
	margin: 2rem auto;
	width: 75%;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 4rem;
	grid-row-gap: 0;
	margin: 2rem auto;
	padding: 2rem 4rem 0;
	border: 1px solid ${props => props.theme.white};

	@media only screen and (max-width: 940px) {
		display: flex;
		flex-direction: column;
	}
`;

const HeadingWithAddButton = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 2rem;
`;
