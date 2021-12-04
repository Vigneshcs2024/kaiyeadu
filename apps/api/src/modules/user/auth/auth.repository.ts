import bcrypt from 'bcrypt';
import config from 'config';
import { StatusCodes } from 'http-status-codes';
import { AuthCredentialsDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { generateOTP } from '$api/utilities';
import { User } from '../user.model';

export async function login(credentials: AuthCredentialsDto) {
	const user = await User.findOne({
		where: { email: credentials.email },
		attributes: ['id', 'password', 'name', 'role', 'designation']
	});

	if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
		throw new ClientError('Invalid credentials', StatusCodes.UNAUTHORIZED);
	}

	return user;
}

export async function createLoginPassword(gpf: string) {
	const user = await User.findOne({ where: { gpf } });
	if (!user) {
		throw new ClientError('User not found', StatusCodes.UNAUTHORIZED);
	}

	const loginPassword = generateOTP(8);
	user.password = await bcrypt.hash(loginPassword, config.get('hashing.saltRounds'));
	await user.save();

	return { user, loginPassword };
}
