import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import { useRequest } from '@kaiyeadu/hooks';
import { BackgroundContainer } from '@kaiyeadu/ui/components';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';

export default function Home() {
	const [isLoading, setIsLoading] = useState(false);
	const [randomValue, setRandomValue] = useState(0);
	const [data, setData] = useState<{ [key: string]: string }>({});
	const { request } = useRequest();

	const getData = async () => {
		setIsLoading(true);

		try {
			const res = await request.get(Requests.COMMON_STATS);
			setData(res.data.result);
			setIsLoading(false);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
			setIsLoading(false);
		}
	};

	const memoizedGetData = useCallback(getData, [request]);

	const list = [
		{
			title: 'Criminals',
			count: 100,
			icon: 'fa6-solid:handcuffs',
			path: '/criminals',
			key: 'criminals'
		},
		{
			title: 'Police Stations',
			count: 80,
			icon: 'mdi:police-station',
			path: '/police-stations',
			key: 'stations'
		},
		{
			title: 'Proposals',
			count: 400,
			icon: 'bx:bx-git-pull-request',
			path: 'requests',
			key: 'proposals'
		},
		{
			title: 'Users',
			count: 200,
			icon: 'bx:user',
			path: '/users',
			key: 'users'
		},
		{
			title: 'Super Users',
			count: 60,
			icon: 'carbon:user-military',
			path: '/super_users',
			key: 'super_users'
		},
		{
			title: 'Admins',
			count: 7,
			icon: 'clarity:administrator-solid',
			path: '/admins',
			key: 'admins'
		}
	];

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	useEffect(() => {
		let ref;
		if (isLoading) {
			ref = setInterval(() => {
				setRandomValue(Math.floor(Math.random() * 100));
			}, 0);
		} else {
			clearInterval(ref);
		}
	}, [isLoading]);

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
								<h1>{isLoading ? randomValue + val.count : data[val.key]}</h1>
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
