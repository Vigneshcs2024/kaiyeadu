import { IUserInput } from '../models';

export type CreateUserDto = IUserInput;

export type ListUsersDto = { pageNumber: number; resultsPerPage: number };
