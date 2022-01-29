import { Router } from 'express';
import { adminsOnly, parseAuthToken } from '$api/middlewares/auth';
import * as commonService from './common.service';

const router = Router();

router.get('/stats', parseAuthToken, adminsOnly, commonService.getStats);
router.get('/ping', commonService.ping);

export { router as commonRouter };
