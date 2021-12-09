import decodeJwt from 'jwt-decode';

// ? The types below need to be updated to match the types in the backend
// ? this can be done by using the type definitions from the backend (library)

type Store = {
	displayName: string;
	token: string;
	isAdmin: boolean;
};

type Payload = {
	display_name: string;
	is_admin: boolean;
};

export class SessionManager {
	private static readonly STORAGE_KEY = 'kaiyeadu';

	public static getStorageKey() {
		return SessionManager.STORAGE_KEY;
	}

	private static readonly getStorage = (): Store =>
		JSON.parse(window.localStorage.getItem(SessionManager.STORAGE_KEY) || '{}');

	private static readonly setStorage = (value: Store) =>
		window.localStorage.setItem(SessionManager.STORAGE_KEY, JSON.stringify(value));

	constructor(private store: Store = SessionManager.getStorage()) {}

	public isAuthenticated(): boolean {
		return !!this.store?.token;
	}

	public isAdmin(): boolean {
		return this.store.isAdmin;
	}

	public setSession(token: string): void {
		const { display_name, is_admin } = decodeJwt(token) as Payload;
		this.store = {
			token,
			displayName: display_name,
			isAdmin: is_admin
		};
		SessionManager.setStorage(this.store);
	}

	public updateTokens(token: string): void {
		this.store.token = token;
		SessionManager.setStorage(this.store);
	}

	public getAuthToken(): string {
		return this.store.token;
	}

	public getDisplayName(): string {
		return this.store.displayName;
	}
}
