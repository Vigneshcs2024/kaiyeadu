import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as occupationService from './occupation.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, occupationService.add);
router.patch('/update/:id', adminsOnly, occupationService.update);
router.delete('/remove/:id', adminsOnly, occupationService.remove);

export { router as occupationRouter };
