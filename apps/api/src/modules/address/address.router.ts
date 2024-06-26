import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as addrService from './address.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, addrService.add);
router.patch('/update/:id', adminsOnly, addrService.update);
router.delete('/remove/:id', adminsOnly, addrService.remove);

export { router as addressRouter };
