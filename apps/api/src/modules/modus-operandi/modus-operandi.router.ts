import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as moService from './modus-operandi.service';

const router = Router();

router.patch('/update/:id', adminsOnly, moService.update);
router.delete('/remove/:id', adminsOnly, moService.remove);

export { router as moRouter };
