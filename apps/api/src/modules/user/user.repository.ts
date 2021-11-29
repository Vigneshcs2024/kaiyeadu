import { CreateUserDto } from '@kaiyeadu/api-interfaces/dtos';
import { User } from './user.model';

export function createUser(userDetails: CreateUserDto) {
	// todo: hash password
	const user = User.build(userDetails);

	return user.save();
}
