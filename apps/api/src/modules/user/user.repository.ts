import bcrypt from 'bcrypt';
import config from 'config';
import { Op } from 'sequelize';
import { CreateUserDto, ListUsersDto } from '@kaiyeadu/api-interfaces/dtos';
import { User } from './user.model';

export async function createUser(userDetails: CreateUserDto) {
	const hashedPassword = userDetails.password
		? await bcrypt.hash(userDetails.password, config.get('api.hashing.saltRounds') ?? 10)
		: null;

	const user = User.build({ ...userDetails, password: hashedPassword });

	return user.save();
}

export async function listUsers({ params, pagination }: ListUsersDto) {
	return User.findAll({
		where: {
			name: {
				[Op.like]: `%${params.search ?? ''}%`
			},
			...params.filters
		},
		offset: (pagination.pageNumber - 1) * pagination.resultsPerPage,
		limit: pagination.resultsPerPage,
		attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
		order: [[params.sort.key, params.sort.order]]
	});
}
