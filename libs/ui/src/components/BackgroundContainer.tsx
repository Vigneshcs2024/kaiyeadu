import { useAuthApi } from '@kaiyeadu/hooks';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

import { Navbar } from '.';
import { LogoLight } from '../assets';
import { admin, master } from '../base/content.sidebar';
import SideBar from './Sidebar';

interface IProps {
	style?: CSSProperties;
	children: ReactNode;
	isLogin?: boolean;
	pageTitle?: string;
}

export default function BackgroundContainer({
	children,
	style,
	isLogin = false,
	pageTitle
}: IProps) {
	const { session } = useAuthApi();

	return isLogin ? (
		<Section
			style={{
				backgroundImage: `linear-gradient(130deg,  rgb(30 226 70 / 60%) 0%, rgb(0 167 164 / 79%) 100%),
					url('${LogoLight}')`,
				...style
			}}>
			{children}
		</Section>
	) : session.getUserRole() !== 'user' ? (
		<SideBar content={session.getUserRole() === 'admin' ? admin : master} pageTitle={pageTitle}>
			<Section
				style={{
					backgroundImage: `linear-gradient(130deg,  rgb(30 226 70 / 60%) 0%, rgb(0 167 164 / 79%) 100%),
				url('${LogoLight}')`,
					...style
				}}>
				{children}
			</Section>
		</SideBar>
	) : (
		<>
			<Navbar pageTitle='Home' />
			<Section
				style={{
					backgroundImage: `linear-gradient(130deg,  rgb(30 226 70 / 60%) 0%, rgb(0 167 164 / 79%) 100%),
	url('${LogoLight}')`,
					...style
				}}>
				{children}
			</Section>
		</>
	);
}

const Section = styled.section`
	min-height: calc(100vh - 55px);
	background: linear-gradient(87deg, rgb(30 226 70 / 60%) 0%, rgb(0 167 164 / 79%) 100%),
		url('/logo.png');
	background-position: center;
	background-repeat: no-repeat;
`;
