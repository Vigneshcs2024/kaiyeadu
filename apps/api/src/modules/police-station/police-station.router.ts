import { Router } from 'express';
import { adminsOnly } from '$api/middlewares/auth';
import * as policeStationService from './police-station.service';

const router = Router();

router.get('/get/:id', policeStationService.findById);
router.patch('/update/:id', adminsOnly, policeStationService.update);
router.get('/list', policeStationService.getList);
router.get('/names', policeStationService.getNames);
router.post('/create', adminsOnly, policeStationService.create);

export { router as policeStationRouter };
