import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as commonService from './common.service';

const router = Router();

router.get('/stats', adminsOnly, commonService.getStats);

export { router as commonRouter };
