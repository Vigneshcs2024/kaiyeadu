import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { GlobalStyles, ThemeEngine } from '@kaiyeadu/ui/base';

ReactDOM.render(
	<StrictMode>
		<GlobalStyles />
		<ThemeEngine>
			<h1>Client app</h1>
		</ThemeEngine>
	</StrictMode>,
	document.getElementById('root')
);
