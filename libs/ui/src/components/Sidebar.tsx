import { ReactChild, useState } from 'react';
import styled from 'styled-components';
import Sidebar from 'react-sidebar';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

import { theme } from '../base';
import { Logo } from '../assets';

interface SidebarProps {
	content: {
		title: string;
		path?: string;
		fun?: () => void;
	}[];
	children: ReactChild;
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
					return <LogoutButton onClick={fun ?? (() => null)}>{title}</LogoutButton>;
				}
				return (
					<>
						<NavLink key={index} to={path}>
							{title}
						</NavLink>
						<Seperator>&nbsp;</Seperator>
					</>
				);
			})}
		</SidebarContainer>
	);
}

export default function SideBar({ content, children }: SidebarProps) {
	const [sidebar, setSideBar] = useState(false);

	return (
		<Sidebar
			sidebar={<SidebarContent content={content} />}
			open={sidebar}
			onSetOpen={open => setSideBar(open)}
			styles={{ sidebar: { background: theme.palette.primary } }}>
			<Navbar>
				<Icon
					className='ham-icon'
					onClick={() => setSideBar(true)}
					icon='feather:menu'
					width='35'
					color='white'
				/>
			</Navbar>
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

const Navbar = styled.div`
	background-color: ${p => p.theme.primary};
	padding: 1rem 3rem;

	.ham-icon {
		cursor: pointer;
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

const Seperator = styled.div`
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
