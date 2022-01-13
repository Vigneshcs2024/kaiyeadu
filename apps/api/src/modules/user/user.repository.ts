import bcrypt from 'bcrypt';
import config from 'config';
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import {
	CreateUserDto,
	FilterableUserParameters,
	SortableUserParameters,
	UpdatePasswordDto,
	UpdateUserDto
} from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { User } from './user.model';
import { Proposal } from '../proposal/proposal.model';

type ListUsersQuery = {
	params: {
		search?: string;
		filters?: Array<Partial<FilterableUserParameters>>;
		sort?: {
			key: SortableUserParameters;
			order: 'ASC' | 'DESC';
		};
	};
	pagination: { pageNumber: number; resultsPerPage: number };
};

export async function createUser(userDetails: CreateUserDto) {
	const hashedPassword = userDetails.password
		? await bcrypt.hash(userDetails.password, config.get('hashing.saltRounds') ?? 10)
		: null;

	const user = User.build({ ...userDetails, password: hashedPassword });

	return user.save();
}

export async function listUsers({ params, pagination }: ListUsersQuery) {
	const total = await User.count();

	const users = await User.findAll({
		where: {
			name: {
				[Op.like]: `%${params.search ?? ''}%`
			},
			...params.filters
		},
		offset: (pagination.pageNumber - 1) * pagination.resultsPerPage,
		limit: pagination.resultsPerPage,
		attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
		order: [[params.sort.key, params.sort.order]],
		raw: true
	});

	return { users, total };
}

export async function getUser(userId: string) {
	const user = await User.findByPk(userId, {
		attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'id'] }
	});

	if (!user) {
		throw new ClientError('User not found', StatusCodes.NOT_FOUND);
	}

	return user;
}

export async function updatePassword(userId: string, updatePasswordDetails: UpdatePasswordDto) {
	const user = await User.findByPk(userId, { attributes: ['password', 'id'] });

	if (!(await bcrypt.compare(updatePasswordDetails.currentPassword, user.password))) {
		throw new ClientError('Incorrect password', StatusCodes.UNAUTHORIZED);
	}

	const hashedPassword = await bcrypt.hash(
		updatePasswordDetails.newPassword,
		config.get('hashing.saltRounds') ?? 10
	);

	return user.update({ password: hashedPassword });
}

export async function updateUser(userId: string, userDetails: UpdateUserDto) {
	const user = await User.findByPk(userId);

	if (!user) {
		throw new ClientError('User not found', StatusCodes.NOT_FOUND);
	}

	return user.update({ ...userDetails });
}

export async function remove(id: string, { force } = { force: false }) {
	const count = await Proposal.count({ where: { created_by: id } });
	if (count > 0 && !force)
		throw new ClientError('The user has some unresolved proposals', StatusCodes.CONFLICT);
	if (force) Proposal.destroy({ where: { created_by: { id } } });
	return await User.destroy({ where: { id } });
}
