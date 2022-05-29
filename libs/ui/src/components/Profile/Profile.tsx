import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackgroundContainer, ModifyButton } from '@kaiyeadu/ui/components';
import { CriminalRecordDto } from '@kaiyeadu/ui/dtos';
import { useAuthApi, useRequest } from '@kaiyeadu/hooks';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { User } from '@kaiyeadu/ui/assets';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { getFullImageURL } from '@kaiyeadu/ui/functions';

import UpdateProposals from './UpdateProposals/UpdateProposals';
import { PersonalProfileDetails } from './PersonalProfileDetails';
import { CaseProfileDetails } from './CaseProfileDetails';
import { OtherProfileDetails } from './OtherProfileDetails';
import { Chip } from '../Chip';
import { Loader } from '../Loader';

export interface TabProps {
	criminalData: CriminalRecordDto;
}

export function Profile() {
	const [tab, setTab] = useState(1);
	const { request } = useRequest();
	const { state: id } = useLocation();
	const [modal, setModal] = useState(false);

	const { session } = useAuthApi();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [criminalData, setCriminalData] = useState<CriminalRecordDto>();

	const getData = async () => {
		try {
			setLoading(true);
			const res = await request.get(Requests.CRIMINAL_GETDETAILS + id);
			setCriminalData(res.data.result);
			setLoading(false);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
		}
	};

	const memoizedGetData = useCallback(getData, [id, request]);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);
	return (
		<BackgroundContainer pageTitle='Profile'>
			{loading && criminalData === undefined ? (
				<Loader />
			) : (
				<Layout>
					<ProfileContainer>
						<ImageContainer>
							<ProfileImage>
								<img
									src={
										criminalData?.image_url
											? getFullImageURL(criminalData?.image_url)
											: User
									}
									alt='profile'
								/>
							</ProfileImage>
							<h1>{criminalData?.name}</h1>
							<h3>HS Number: {criminalData?.hs_number}</h3>
							<div
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexWrap: 'wrap',
									flexDirection: 'column',
									marginTop: '1rem'
								}}>
								{criminalData?.modusOperandi.map(mo => (
									<Chip key={mo.id}>{mo.type}</Chip>
								))}
							</div>
						</ImageContainer>
						<div>
							<TabContainer>
								<TabButton isActive={tab === 1} onClick={() => setTab(1)}>
									Personal Details
								</TabButton>
								<TabButton isActive={tab === 2} onClick={() => setTab(2)}>
									Case Details
								</TabButton>
								<TabButton isActive={tab === 3} onClick={() => setTab(3)}>
									Other Details
								</TabButton>
							</TabContainer>

							{tab === 1 ? (
								<PersonalProfileDetails
									criminalData={criminalData as CriminalRecordDto}
								/>
							) : tab === 2 ? (
								<CaseProfileDetails
									criminalData={criminalData as CriminalRecordDto}
								/>
							) : (
								<OtherProfileDetails
									criminalData={criminalData as CriminalRecordDto}
								/>
							)}
						</div>
					</ProfileContainer>

					{session.getUserRole() === 'user' && (
						<ModifyButton
							icon='uil:comments'
							width='40'
							onClick={() => setModal(true)}
						/>
					)}
					{session.getUserRole() !== 'user' && (
						<ModifyButton
							icon='ci:edit'
							width='40'
							onClick={() => {
								navigate(`/criminal/edit`, { state: criminalData });
							}}
						/>
					)}

					{modal && <UpdateProposals setModal={setModal} />}
				</Layout>
			)}
		</BackgroundContainer>
	);
}

const ImageContainer = styled.div`
	margin: 2rem 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	min-width: 30%;
`;

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	text-align: center;
`;

const ProfileContainer = styled.div`
	margin: 2rem auto;
	min-width: 90vw;
	min-height: 80vh;
	background-color: ${props => props.theme.white};
	display: flex;
	justify-content: center;

	& p {
		margin-bottom: 1rem;
	}
`;

const ProfileImage = styled.div`
	margin: 2rem;
	width: 26rem;
	height: 26rem;
	background-color: ${props => props.theme.primary};
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;

	& > img {
		width: 25rem;
		height: 25rem;
		border-radius: 50%;
	}
`;

const TabButton = styled.button<{ isActive: boolean }>`
	margin: 0.5rem 0.5rem 0;
	padding: 1rem;
	font-size: inherit;
	color: ${props => (props.isActive ? props.theme.white : props.theme.black)};
	background-color: ${props => (props.isActive ? props.theme.primary : props.theme.white)};
	border: ${props =>
		props.isActive ? `1px solid ${props.theme.white}` : `1px solid ${props.theme.black}`};
	border-bottom: none;
	border-top-left-radius: 0.5rem;
	border-top-right-radius: 0.5rem;
	border-bottom-left-radius: -0.5rem;
	cursor: pointer;
	transition: 0.2s ease-in-out;

	&:hover {
		background-color: ${props => `${props.theme.primary}50`};
		color: ${props => props.theme.white};
		border: ${props => `1px solid ${props.theme.primary}`};
		border-bottom: none;
	}
`;

const TabContainer = styled.div`
	margin: 2rem 2rem 0;
	display: flex;
`;
