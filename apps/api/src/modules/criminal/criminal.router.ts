import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as criminalService from './criminal.service';

const router = Router();

router.post('/create', adminsOnly, criminalService.create);
router.get('/details/:id', criminalService.getDetails);
router.get('/minimal-list', criminalService.getMinimalList);
router.patch('/update/:id', adminsOnly, criminalService.updatePersonalDetails);
router.delete('/remove/:id', adminsOnly, criminalService.remove);

export { router as criminalRouter };
