import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as fmService from './family-member.service';

const router = Router();

router.post('/:criminalId/add', adminsOnly, fmService.add);
router.patch('/update/:id', adminsOnly, fmService.update);
router.delete('/remove/:id', adminsOnly, fmService.remove);

export { router as familyMemberRouter };
