import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as linkService from './link.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, linkService.add);
router.patch('/update/:id', adminsOnly, linkService.update);
router.delete('/remove/:id', adminsOnly, linkService.remove);

export { router as linkRouter };
