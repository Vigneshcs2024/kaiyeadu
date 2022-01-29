import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as opService from './operational-places.service';

const router = Router();

router.get('/districts', opService.getDistricts);
router.post('/:criminalId/add', adminsOnly, opService.add);
router.patch('/update/:id', adminsOnly, opService.update);
router.delete('/remove/:id', adminsOnly, opService.remove);

export { router as operationalPlacesRouter };
