import fs from 'fs';
import multer from 'multer';
import os from 'os';
import path from 'path';
import crypto from 'crypto';

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const storageLocation = path.resolve(os.homedir(), 'kaiyeadu', 'uploads');
		if (!fs.existsSync(storageLocation)) {
			fs.mkdirSync(storageLocation, { recursive: true });
		}
		cb(null, storageLocation);
	},
	filename: (_req, file, cb) => {
		const [fileName, extension] = file.originalname.split('.');
		cb(null, `${fileName}-${crypto.randomBytes(10).toString('hex')}.${extension}`);
	}
});

export const upload = multer({ storage });
