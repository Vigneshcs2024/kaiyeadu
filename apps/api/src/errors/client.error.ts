export class ClientError extends Error {
	constructor(public message: string) {
		super(message);
		this.name = 'ClientError';
	}
}
