import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as associateService from './associate.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, associateService.add);
router.post('/update/:id', adminsOnly, associateService.update);
router.delete('/remove/:id', adminsOnly, associateService.remove);

export { router as associateRouter };
