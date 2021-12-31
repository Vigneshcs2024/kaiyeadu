import { Router } from 'express';
import { uploadImage } from './upload.service';

const router = Router();

router.post('/image', uploadImage);

export { router as uploadRouter };
