import { IUserInput } from '../models';

export type CreateUserDto = IUserInput;

export type SortableUserParameters = keyof Omit<
	IUserInput,
	'password' | 'police_station' | 'designation' | 'role'
>;
export type FilterableUserParameters = Omit<IUserInput, 'name' | 'password' | 'email' | 'phone'>;

export type ListUsersDto = {
	page: number;
	count: number;
	q?: string;
	f?: Partial<FilterableUserParameters>[];
	s?: { key: SortableUserParameters; order: 'ASC' | 'DESC' };
};

export interface UpdatePasswordDto {
	currentPassword: string;
	newPassword: string;
}

export type UpdateUserDto = Partial<Omit<CreateUserDto, 'password'>>;
