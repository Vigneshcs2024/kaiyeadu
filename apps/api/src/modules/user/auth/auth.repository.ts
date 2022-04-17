import bcrypt from 'bcrypt';
import config from 'config';
import { StatusCodes } from 'http-status-codes';
import { AdminAuthCredentialsDto, UserAuthCredentials } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { generateOTP } from '$api/utilities';
import { User } from '../user.model';

export async function login({
	email,
	gpf,
	password
}: Partial<AdminAuthCredentialsDto & UserAuthCredentials>) {
	const user = await User.findOne({
		where: email ? { email } : { gpf },
		attributes: ['id', 'password', 'name', 'role', 'designation']
	});

	if (!user || !(await bcrypt.compare(password, user.password))) {
		throw new ClientError('Invalid or expired credentials', StatusCodes.BAD_REQUEST);
	}

	if (user.role === 'user') {
		user.password = '';
		await user.save();
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

export async function resetPassword(email: string) {
	const user = await User.findOne({ where: { email } });
	if (!user) {
		throw new ClientError('User not found', StatusCodes.UNAUTHORIZED);
	}

	if (user.role === 'user') {
		throw new ClientError('User cannot reset password', StatusCodes.FORBIDDEN);
	}

	const resetOtp = generateOTP(8, false);
	user.password = await bcrypt.hash(resetOtp, config.get('hashing.saltRounds'));
	await user.save();

	return { user, resetOtp };
}
