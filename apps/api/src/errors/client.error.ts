export class ClientError extends Error {
	constructor(public message: string, public status: number) {
		super(message);
		this.name = 'ClientError';
	}
}
