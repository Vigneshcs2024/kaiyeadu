import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as vehicleService from './vehicle.service';

const router = Router();

router.patch('/update/:id', adminsOnly, vehicleService.update);

export { router as vehicleRouter };
