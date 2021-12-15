import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as criminalService from './criminal.service';

const router = Router();

router.post('/create', adminsOnly, criminalService.create);
router.get('/details/:id', criminalService.getDetails);
router.get('/minimal-list', criminalService.getMinimalList);

export { router as criminalRouter };
