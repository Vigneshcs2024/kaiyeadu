import { Router } from 'express';
import * as policeStationService from './police-station.service';

const router = Router();

router.get('/list', policeStationService.listStations);
router.get('/get/:id', policeStationService.getPoliceStation);
router.post('/create', policeStationService.createStation);

export { router as policeStationRouter };
