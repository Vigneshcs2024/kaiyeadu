import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { upload } from './upload.controller';
import { accessLogger } from '$api/tools/access-logger';

export function uploadImage(req: ApiRequest, res: Response) {
	const handler = (msg?: string) => {
		accessLogger(req, `Image uploaded`);
		res.status(StatusCodes.CREATED).json({
			message: 'Image uploaded successfully',
			result: { msg, path: req.file.filename }
		});
	};

	upload.single('image')(req, res, handler);
}
