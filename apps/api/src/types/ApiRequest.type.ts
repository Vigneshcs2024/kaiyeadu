import { Request } from 'express';
import { User } from '../modules/user/user.model';

export interface ApiRequest extends Request {
	user?: User;
}
