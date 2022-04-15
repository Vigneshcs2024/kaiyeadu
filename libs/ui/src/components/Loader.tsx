import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import { theme } from '../base';

export function Loader(): JSX.Element {
	return (
		<Overlay>
			&nbsp;
			<ReactLoading type='spinningBubbles' color={theme.palette.white} />
		</Overlay>
	);
}

const Overlay = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.25);
`;
