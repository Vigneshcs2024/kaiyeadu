import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as moService from './modus-operandi.service';

const router = Router();

router.patch('/update/:id', adminsOnly, moService.update);

export { router as moRouter };
