import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './pages/Login/Login';

export default function Router() {
	return (
		<Switch>
			<Route path='/login' exact component={Login} />
			<Route path='*'>
				<Redirect to='/login' />
			</Route>
		</Switch>
	);
}
