import { IUserInput } from '../models';

export type CreateUserDto = IUserInput;

export type SortableUserParameters = keyof Pick<IUserInput, 'name' | 'gpf' | 'email' | 'phone'>;
export type FilterableUserParameters = Pick<IUserInput, 'police_station' | 'designation' | 'role'>;

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
