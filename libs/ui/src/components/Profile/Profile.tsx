import { useState } from 'react';
import styled from 'styled-components';

import { BackgroundContainer, ModifyButton } from '@kaiyeadu/ui/components';
import { CriminalRecordDto } from '@kaiyeadu/ui/dtos';
import { useAuthApi } from '@kaiyeadu/hooks';
import { PersonalProfileDetails } from './PersonalProfileDetails';
import { CaseProfileDetails } from './CaseProfileDetails';
import { OtherProfileDetails } from './OtherProfileDetails';
import { Chip } from '../Chip';

export interface TabProps {
	criminalData: CriminalRecordDto;
}

export function Profile({ criminalData }: TabProps) {
	const [tab, setTab] = useState(1);
	const { session } = useAuthApi();

	return (
		<BackgroundContainer pageTitle='Profile'>
			<Layout>
				<ProfileContainer>
					<ImageContainer>
						<ProfileImage>
							{/* Image url to be changed to criminal's photo */}
							<img src='https://source.unsplash.com/WNoLnJo7tS8' alt='profile' />
						</ProfileImage>
						<h1>{criminalData.name}</h1>
						<h3>HS Number: {criminalData.hs_number}</h3>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginTop: '1rem'
							}}>
							{criminalData.modusOperandi.map(mo => (
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
							<PersonalProfileDetails criminalData={criminalData} />
						) : tab === 2 ? (
							<CaseProfileDetails criminalData={criminalData} />
						) : (
							<OtherProfileDetails criminalData={criminalData} />
						)}
					</div>
				</ProfileContainer>
				{session.getUserRole() === 'admin' ||
					session.getUserRole() === 'master' ||
					(window.location.port === '3000' && ( // Needed to be removed after development
						<>
							<ModifyButton icon='ci:edit' width='40' />
							<ModifyButton
								icon='fluent:delete-24-filled'
								width='40'
								style={{ bottom: '11rem' }}
							/>
						</>
					))}
			</Layout>
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
	min-height: 100vh;
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