import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as laService from './last-arrest.service';

const router = Router();

router.patch('/update/:id', adminsOnly, laService.update);

export { router as lastArrestRouter };
