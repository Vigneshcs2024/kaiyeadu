import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as bondService from './bond.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, bondService.add);
router.patch('/update/:id', adminsOnly, bondService.update);
router.delete('/remove/:id', adminsOnly, bondService.remove);

export { router as bondRouter };
