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
	user.password = await bcrypt.hash(loginPassword, config.get('api.hashing.saltRounds'));
	await user.save();

	return { user, loginPassword };
}

export async function resetPassword(email: string) {
	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new ClientError('User not found', StatusCodes.UNAUTHORIZED);
	}

	if (user.role === 'user') {
		throw new ClientError('User cannot reset password', StatusCodes.FORBIDDEN);
	}

	const resetOtp = generateOTP(6, false);
	user.password = await bcrypt.hash(resetOtp, config.get('api.hashing.saltRounds'));
	await user.save();

	return { user, resetOtp };
}
