import { StatusCodes } from 'http-status-codes';
import { ClientError } from './client.error';

export class AuthenticationError extends ClientError {
	status: number;
	constructor(message: string) {
		super(message, StatusCodes.UNAUTHORIZED);
		this.name = 'Authentication Error';
	}
}

export class AuthorizationError extends ClientError {
	status: number;
	constructor(message: string) {
		super(message, StatusCodes.FORBIDDEN);
		this.name = 'Authorization Error';
	}
}
