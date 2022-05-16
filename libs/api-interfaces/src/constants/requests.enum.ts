export enum Requests {
	ADMIN_LOGIN = 'auth/admin/login',
	ADMIN_RESET_PASSWORD = 'auth/admin/reset-password',

	USER_LOGIN = 'auth/user/login',
	USER_GET_PASSWORD = 'auth/user/get-login-password',

	USER_CREATE = 'user/create',
	USER_LIST = 'user/list',
	USER_GET = 'user/get',
	USER_UPDATE = 'user/update',
	USER_REMOVE = 'user/remove/',

	CRIMINAL_LIST = 'criminal/minimal-list',
	CRIMINAL_GETDETAILS = 'criminal/details/',
	CRIMINAL_REMOVE = 'criminal/remove/',
	CRIMINAL_FILTER = 'criminal/minimal-list?page=1&count=10&s={"key":"name","order":"ASC"}&',

	PROPOSAL_LIST = 'proposal/list',
	CRIMINAL_CREATE = 'criminal/create',

	STATION_LIST = '/police-station/list',
	STATION_CREATE = '/police-station/create',
	STATION_REMOVE = '/police-station/remove/',

	USER_UPDATE_PASSWORD = 'user/update-password',
	USER_UPDATE_PROPOSAL = '/proposal/create',

	COMMON_STATS = 'common/stats'
}
