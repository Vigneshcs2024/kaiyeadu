import { PayloadObject } from '@kaiyeadu/api-interfaces/responses';
import { Request } from 'express';

export interface ApiRequest extends Request {
	user?: PayloadObject;
}
