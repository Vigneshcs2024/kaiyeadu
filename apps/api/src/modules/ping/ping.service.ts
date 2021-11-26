import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export function ping(_req: Request, res: Response) {
	res.status(StatusCodes.OK).send('pong');
}
