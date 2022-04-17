import { useAuthApi } from '@kaiyeadu/hooks';
import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';
import { Navbar } from '.';

import { LogoLight } from '../assets';
import { admin } from '../base/content.sidebar';
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
				backgroundImage: `linear-gradient(130deg, rgba(226, 30, 36, 0.6) 0%,rgba(6, 0, 167, 0.79)  100%),
					url('${LogoLight}')`,
				...style
			}}>
			{children}
		</Section>
	) : window.location.port === '3000' ? (
		<SideBar content={admin} pageTitle={pageTitle}>
			<Section
				style={{
					backgroundImage: `linear-gradient(130deg, rgba(226, 30, 36, 0.6) 0%,rgba(6, 0, 167, 0.79)  100%),
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
					backgroundImage: `linear-gradient(130deg, rgba(226, 30, 36, 0.6) 0%,rgba(6, 0, 167, 0.79)  100%),
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
	background: linear-gradient(87deg, rgba(182, 110, 112, 0.5) 60%, rgba(43, 41, 115, 0.5) 100%),
		url('/logo.png');
	background-position: center;
	background-repeat: no-repeat;
`;
