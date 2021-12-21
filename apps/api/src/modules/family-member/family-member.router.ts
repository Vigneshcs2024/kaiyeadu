import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as fmService from './family-member.service';

const router = Router();

router.patch('/update/:id', adminsOnly, fmService.update);

export { router as familyMemberRouter };
