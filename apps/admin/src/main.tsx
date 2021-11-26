import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { GlobalStyles } from '@kaiyeadu/ui';

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<GlobalStyles />
			<p>Admin Panel</p>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
);
