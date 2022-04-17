export enum Requests {
	ADMIN_LOGIN = 'auth/admin/login',
	ADMIN_RESET_PASSWORD = 'auth/admin/reset-password',

	USER_LOGIN = 'auth/user/login',
	USER_GET_PASSWORD = 'auth/user/get-login-password',

	USER_CREATE = 'user/create',
	USER_LIST = 'user/list',
	USER_GET = 'user/get',
	USER_UPDATE = 'user/update',
	USER_REMOVE = 'user/remove',

	STATION_LIST = '/police-station/list',

	USER_UPDATE_PASSWORD = 'user/update-password',

	COMMON_STATS = 'common/stats'
}
