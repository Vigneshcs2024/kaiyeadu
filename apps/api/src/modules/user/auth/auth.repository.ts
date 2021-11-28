import { StatusCodes } from 'http-status-codes';
import { AuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { User } from '../user.model';

export async function login(credentials: AuthCredentialsDto) {
	const user = await User.findOne({ where: { email: credentials.email } });

	if (!user || user.password !== credentials.password) {
		throw new ClientError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}

	return user;
}
