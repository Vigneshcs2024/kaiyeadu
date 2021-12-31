import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as caseService from './case.service';

const router = Router();

router.get('/all/:criminal_id', caseService.getAll);
router.get('/:criminal_id', caseService.getInactiveCases);
router.post('/:criminalId/add', adminsOnly, caseService.add);
router.patch('/update/:id', adminsOnly, caseService.update);
router.delete('/remove/:id', adminsOnly, caseService.remove);

export { router as caseRouter };
