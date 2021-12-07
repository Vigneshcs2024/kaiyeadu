import decodeJwt from 'jwt-decode';

export type TokenPair = {
	authToken: string;
	refreshToken: string;
};

// ? The types below need to be updated to match the types in the backend
// ? this can be done by using the type definitions from the backend (library)

type Store = {
	displayName: string;
	tokens: TokenPair;
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
		return !!this.store?.tokens?.authToken;
	}

	public isAdmin(): boolean {
		return this.store.isAdmin;
	}

	public setSession(tokens: TokenPair): void {
		const { display_name, is_admin } = decodeJwt(tokens.authToken) as Payload;
		this.store = {
			tokens,
			displayName: display_name,
			isAdmin: is_admin
		};
		SessionManager.setStorage(this.store);
	}

	public updateTokens(tokens: TokenPair): void {
		this.store.tokens = tokens;
		SessionManager.setStorage(this.store);
	}

	public getAuthToken(): string {
		return this.store.tokens.authToken;
	}

	public getRefreshToken(): string {
		return this.store.tokens.refreshToken;
	}

	public getDisplayName(): string {
		return this.store.displayName;
	}
}
