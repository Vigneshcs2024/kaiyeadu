import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as bondService from './bond.service';

const router = Router();

router.patch('/update/:id', adminsOnly, bondService.update);

export { router as bondRouter };
