import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { SampleType } from '@kaiyeadu/api-interfaces';

import App from './app/app';
import styled from 'styled-components';

const StyledText = styled.p`
	font-size: 6rem;
`;

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<App />
			<StyledText>Hi</StyledText>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);

const something: SampleType = { a: 'b' };
