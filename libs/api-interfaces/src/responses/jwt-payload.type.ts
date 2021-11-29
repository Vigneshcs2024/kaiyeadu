import { IUser } from '../models';

export type PayloadObject = Pick<IUser, 'id' | 'name' | 'designation' | 'role'>;
