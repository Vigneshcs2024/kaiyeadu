import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { GlobalStyles, theme } from '@kaiyeadu/ui/base';
import Router from './Router';
import { AuthEngine } from '@kaiyeadu/hooks';

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<GlobalStyles />
			<Helmet>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap'
				/>
			</Helmet>
			<AuthEngine>
				<ThemeProvider theme={theme.palette}>
					<Router />
				</ThemeProvider>
			</AuthEngine>
		</BrowserRouter>
		<Toaster />
	</StrictMode>,
	document.getElementById('root')
);
