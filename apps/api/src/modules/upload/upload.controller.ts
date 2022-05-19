import fs from 'fs';
import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const storageLocation = path.join(__dirname, 'src/upload/images');
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
