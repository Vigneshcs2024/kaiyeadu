import styled from 'styled-components';
import { Icon } from '@iconify/react';

import { BackgroundContainer } from '@kaiyeadu/ui/components';

export default function Home() {
	const list = [
		{ title: 'Records', count: 100, icon: 'ant-design:unordered-list-outlined' },
		{ title: 'Police Station', count: 80, icon: 'feather:home' },
		{ title: 'Requests', count: 4000, icon: 'bx:bx-git-pull-request' },
		{ title: 'Admins', count: 7, icon: 'clarity:administrator-solid' }
	];

	return (
		<BackgroundContainer
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexWrap: 'wrap'
			}}>
			{list.map((val, ind) => {
				return (
					<Container key={ind}>
						<h3>{val.title}</h3>
						<div>
							<h1>{val.count}</h1>
							<Icon icon={val.icon} width={40} height={40} color='#E18B8D' />
						</div>
					</Container>
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
