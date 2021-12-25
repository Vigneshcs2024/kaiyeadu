import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ApiRequest } from '$api/types';
import { upload } from './upload.controller';

export function uploadImage(req: ApiRequest, res: Response) {
	const handler = (msg?: string) => {
		res.status(StatusCodes.CREATED).json({
			message: 'Image uploaded successfully',
			result: { msg, path: req.file.filename }
		});
	};

	upload.single('image')(req, res, handler);
}
