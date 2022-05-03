import { Fragment, ReactChild, useState } from 'react';
import styled from 'styled-components';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router-dom';

import { theme } from '../base';
import { Logo } from '../assets';

import { Navbar } from '@kaiyeadu/ui/components';

interface SidebarProps {
	content: {
		title: string;
		path?: string;
		fun?: () => void;
	}[];
	children: ReactChild;
	pageTitle?: string;
	username?: string;
}

interface ContentProps {
	content: {
		title: string;
		path?: string;
		fun?: () => void;
	}[];
}

function SidebarContent({ content }: ContentProps) {
	return (
		<SidebarContainer>
			<LogoImage src={Logo} alt='logo' />
			{content.map(({ title, path, fun }, index) => {
				if (!path) {
					return (
						<LogoutButton key={index} onClick={fun ?? (() => null)}>
							{title}
						</LogoutButton>
					);
				}
				return (
					<Fragment key={index}>
						<NavLink to={path}>{title}</NavLink>
						<Separator>&nbsp;</Separator>
					</Fragment>
				);
			})}
		</SidebarContainer>
	);
}

export default function SideBar({ content, children, pageTitle }: SidebarProps) {
	const [sidebar, setSideBar] = useState(false);

	return (
		<Sidebar
			sidebar={<SidebarContent content={content} />}
			open={sidebar}
			onSetOpen={open => setSideBar(open)}
			styles={{ sidebar: { background: theme.palette.primary } }}>
			<Navbar pageTitle={pageTitle} setSideBar={setSideBar} />
			{children}
		</Sidebar>
	);
}

const LogoutButton = styled.button`
	border: none;
	outline: none;
	background-color: ${p => p.theme.primary};
	color: ${p => p.theme.white};
	font-family: inherit;
	cursor: pointer;
	font-size: 1.7rem;
	margin: 2rem auto;
	text-transform: uppercase;
	transition: all 0.2s;

	&:hover {
		color: ${p => p.theme.lightGrey};
	}
`;

const NavLink = styled(Link)`
	position: relative;
	color: ${p => p.theme.white};
	margin: 2rem auto;
	font-family: inherit;
	font-size: 1.7rem;
	letter-spacing: 0.5px;
	text-transform: uppercase;
	transition: all 0.2s;

	&:hover {
		color: ${p => p.theme.lightGrey};
	}
`;

const LogoImage = styled.img`
	width: 20rem;
	margin: 2rem;
`;

const Separator = styled.div`
	height: 0.1rem;
	width: 100%;
	background-color: ${p => p.theme.lightGrey};
`;

const SidebarContainer = styled.div`
	margin: 1rem 2rem auto;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;
