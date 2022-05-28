import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

import { theme } from '../base';

export function Loader({ withOverlay = true }: { withOverlay?: boolean }): JSX.Element {
	return withOverlay ? (
		<Overlay>
			&nbsp;
			<CustomLoader />
		</Overlay>
	) : (
		<div style={{ padding: '2em' }}>
			<CustomLoader />
		</div>
	);
}

function CustomLoader() {
	return <ReactLoading type='spinningBubbles' color={theme.palette.white} />;
}

const Overlay = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.65);
	z-index: 9999;
`;
