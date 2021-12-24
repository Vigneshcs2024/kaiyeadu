import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as laService from './last-arrest.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, laService.add);
router.patch('/update/:id', adminsOnly, laService.update);
router.delete('/remove/:id', adminsOnly, laService.remove);

export { router as lastArrestRouter };
