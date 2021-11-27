import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles, theme } from '@kaiyeadu/ui/base';
import Login from './pages/Login/Login';

ReactDOM.render(
	<StrictMode>
		<GlobalStyles />
		<ThemeProvider theme={theme.palette}>
			<Login />
		</ThemeProvider>
	</StrictMode>,
	document.getElementById('root')
);
