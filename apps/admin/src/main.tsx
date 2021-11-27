import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyles, theme } from '@kaiyeadu/ui/base';
import Router from './Router';

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<GlobalStyles />
			<ThemeProvider theme={theme.palette}>
				<Router />
			</ThemeProvider>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);
