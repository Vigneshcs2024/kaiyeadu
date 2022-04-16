import decodeJwt from 'jwt-decode';
import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';

// ? The types below need to be updated to match the types in the backend
// ? this can be done by using the type definitions from the backend (library)

type Store = {
	name: PayloadObject['name'];
	token: string;
	role: PayloadObject['role'];
	designation: PayloadObject['designation'];
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

	private static readonly clearStorage = () =>
		window.localStorage.setItem(SessionManager.STORAGE_KEY, JSON.stringify({}));

	constructor(private store: Store = SessionManager.getStorage()) {}

	public isAuthenticated(): boolean {
		return !!this.store?.token;
	}

	public getUserRole(): Store['role'] {
		return this.store.role;
	}

	public isAdmin(): boolean {
		return this.store.role !== 'user';
	}

	public setSession(token: string): void {
		const { name, designation, role } = decodeJwt(token) as PayloadObject;
		this.store = { token, name, role, designation };
		SessionManager.setStorage(this.store);
	}

	public clearSession(): void {
		SessionManager.clearStorage();
	}

	public updateTokens(token: string): void {
		this.store.token = token;
		SessionManager.setStorage(this.store);
	}

	public getAuthToken(): string {
		return this.store.token;
	}

	public getDisplayName(): string {
		return this.store.name;
	}
}
