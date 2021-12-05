import { IUserInput } from '../models';

export type CreateUserDto = IUserInput;

export type SortableParameters = keyof Omit<
	IUserInput,
	'password' | 'police_station' | 'designation' | 'role'
>;
export type FilterableParameters = Omit<IUserInput, 'name' | 'password' | 'email' | 'phone'>;

export type ListUsersDto = {
	params: {
		search?: string;
		filters?: Array<Partial<FilterableParameters>>;
		sort?: {
			key: SortableParameters;
			order: 'ASC' | 'DESC';
		};
	};
	pagination: { pageNumber: number; resultsPerPage: number };
};

export interface UpdatePasswordDto {
	currentPassword: string;
	newPassword: string;
}
