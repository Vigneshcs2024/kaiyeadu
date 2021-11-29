import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import { AuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { User } from '../user.model';

export async function login(credentials: AuthCredentialsDto) {
	const user = await User.findOne({
		where: { email: credentials.email },
		attributes: ['id', 'password', 'name', 'role', 'designation']
	});

	if (!user || (await bcrypt.compare(credentials.password, user.password))) {
		throw new ClientError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}

	return user;
}
