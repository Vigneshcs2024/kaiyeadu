import bcrypt from 'bcrypt';
import config from 'config';
import { CreateUserDto, ListUsersDto } from '@kaiyeadu/api-interfaces/dtos';
import { User } from './user.model';

export async function createUser(userDetails: CreateUserDto) {
	const hashedPassword = await bcrypt.hash(
		userDetails.password,
		config.get('hashing.saltRounds') ?? 10
	);

	const user = User.build({ ...userDetails, password: hashedPassword });

	return user.save();
}

export async function listUsers({ pageNumber, resultsPerPage }: ListUsersDto) {
	return User.findAll({
		offset: (pageNumber - 1) * resultsPerPage,
		limit: resultsPerPage,
		attributes: { exclude: ['password', 'createdAt', 'updatedAt'] }
	});
}
