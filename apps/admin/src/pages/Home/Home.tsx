import styled from 'styled-components';
import { Icon } from '@iconify/react';

import { BackgroundContainer } from '@kaiyeadu/ui/components';
import { Link } from 'react-router-dom';

export default function Home() {
	const list = [
		{
			title: 'Criminals',
			count: 100,
			icon: 'ant-design:unordered-list-outlined',
			path: '/criminals'
		},
		{ title: 'Police Stations', count: 80, icon: 'feather:home', path: '/police-stations' },
		{ title: 'Update Requests', count: 4000, icon: 'bx:bx-git-pull-request', path: 'requests' },
		{ title: 'Admins', count: 7, icon: 'clarity:administrator-solid', path: '/admins' }
	];

	return (
		<BackgroundContainer
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap'
			}}
			pageTitle='Home'>
			{list.map((val, ind) => {
				return (
					<Link to={val.path} key={ind}>
						<Container key={ind}>
							<h3>{val.title}</h3>
							<div>
								<h1>{val.count}</h1>
								<Icon icon={val.icon} width={40} height={40} color='#E18B8D' />
							</div>
						</Container>
					</Link>
				);
			})}
		</BackgroundContainer>
	);
}

const Container = styled.div`
	background-color: ${p => p.theme.white};
	color: ${p => p.theme.primary};
	padding: 1em;
	border-radius: 0.5em;
	margin: 2em;
	cursor: pointer;
	min-width: 250px;

	h3 {
		font-weight: 400;
	}

	div {
		margin-top: 1.5em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;
