import bcrypt from 'bcrypt';
import config from 'config';
import { CreateUserDto } from '@kaiyeadu/api-interfaces/dtos';
import { User } from './user.model';

export async function createUser(userDetails: CreateUserDto) {
	const hashedPassword = await bcrypt.hash(
		userDetails.password,
		config.get('hashing.saltRounds') ?? 10
	);

	const user = User.build({ ...userDetails, password: hashedPassword });

	return user.save();
}
