import { Icon } from '@iconify/react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useAuthApi } from '@kaiyeadu/hooks';

export function Navbar({
	pageTitle,
	setSideBar
}: {
	pageTitle?: string | undefined;
	setSideBar?: Dispatch<SetStateAction<boolean>>;
}) {
	const { setAuthToken, session } = useAuthApi();

	return (
		<NavbarContainer>
			<NavItemContainer>
				{setSideBar && (
					<Icon
						className='ham-icon'
						onClick={() => setSideBar(true)}
						icon='feather:menu'
						width='35'
						color='white'
					/>
				)}
				<Link to='/'>
					<p className='pageTitle'>{pageTitle}</p>
				</Link>
			</NavItemContainer>
			<NavItemContainer>
				<Icon icon='akar-icons:circle-fill' color='#1dff00' width='10' />
				<p className='username'>{session.getDisplayName()}</p>
				<Icon
					className='logout'
					icon='grommet-icons:power-shutdown'
					color='#fff'
					width='30'
					onClick={() => {
						setAuthToken('');
					}}
				/>
			</NavItemContainer>
		</NavbarContainer>
	);
}

const NavbarContainer = styled.div`
	display: flex;
	background-color: ${p => p.theme.primary};
	padding: 1rem 3rem;
	justify-content: space-between;
	align-items: center;

	.ham-icon {
		cursor: pointer;
	}
`;

const NavItemContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	.pageTitle {
		font-size: 2rem;
	}

	p {
		color: ${p => p.theme.white};
		font-weight: 700;
		margin-left: 1rem;
	}

	.logout {
		margin-left: 3rem;
		cursor: pointer;
	}
`;
