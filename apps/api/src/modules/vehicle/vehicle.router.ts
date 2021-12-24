import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as vehicleService from './vehicle.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, vehicleService.add);
router.patch('/update/:id', adminsOnly, vehicleService.update);
router.delete('/remove/:id', adminsOnly, vehicleService.remove);

export { router as vehicleRouter };
