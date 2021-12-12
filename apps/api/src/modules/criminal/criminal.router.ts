import { adminsOnly } from '$api/middlewares/auth';
import { Router } from 'express';

const router = Router();

router.post('/create', adminsOnly);

export { router as criminalRouter };
