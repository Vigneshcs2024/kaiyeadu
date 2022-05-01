import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { theme } from '@kaiyeadu/ui/base';
import { BackgroundContainer, Button, DropDownList, TextField } from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useRequest } from '@kaiyeadu/hooks';
import { CommonObject, CustomAxiosError } from '@kaiyeadu/ui/interface';

import { AddUserValidation } from './validationSchema';
interface AddUserInt {
	name: string;
	gpf: string;
	email: string;
	phone: string;
	police_station: string;
	designation: string;
	role: string;
}

const initialAddUserValues: AddUserInt = {
	name: '',
	gpf: '',
	email: '',
	phone: '',
	police_station: '',
	designation: '',
	role: 'user'
};

export function AddUser() {
	const [isLoading, setIsLoading] = useState(false);
	const [stationList, setStationList] = useState([
		{
			label: 'Select',
			value: ''
		}
	]);
	const navigate = useNavigate();
	const { request } = useRequest();

	const formik = useFormik({
		initialValues: initialAddUserValues,
		validationSchema: AddUserValidation,
		onSubmit: async values => {
			setIsLoading(true);

			try {
				const res = await request.post(Requests.USER_CREATE, values);
				setIsLoading(false);
				toast.success(res.data.message);
				setTimeout(() => {
					navigate('/users');
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
		<BackgroundContainer pageTitle='Add User'>
			<Layout>
				<Form onSubmit={formik.handleSubmit}>
					<TextField
						label='Name'
						name='name'
						value={formik.values.name}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.name && formik.errors.name
								? {
										content: formik.errors.name,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='GPF Number'
						name='gpf'
						value={formik.values.gpf}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.gpf && formik.errors.gpf
								? {
										content: formik.errors.gpf,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Email'
						type='email'
						name='email'
						value={formik.values.email}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.email && formik.errors.email
								? {
										content: formik.errors.email,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Phone'
						type='tel'
						name='phone'
						value={formik.values.phone}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.phone && formik.errors.phone
								? {
										content: formik.errors.phone,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<TextField
						label='Designation'
						name='designation'
						value={formik.values.designation}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.designation && formik.errors.designation
								? {
										content: formik.errors.designation,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Police Station'
						id='police_station'
						items={stationList}
						name='police_station'
						value={formik.values.police_station}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.police_station && formik.errors.police_station
								? {
										content: formik.errors.police_station,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<DropDownList
						label='Role'
						id='role'
						items={['user', 'admin', 'master']}
						name='role'
						value={formik.values.role}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						tip={
							formik.touched.role && formik.errors.role
								? {
										content: formik.errors.role,
										color: theme.palette.danger
								  }
								: ''
						}
					/>
					<Button type='submit'>Add User</Button>
				</Form>
			</Layout>
		</BackgroundContainer>
	);
}

const Form = styled.form`
	margin: 3rem auto;
`;

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	color: ${p => p.theme.white};

	h1 {
		font-size: 4.5rem;
		margin: 1em;
	}
`;
