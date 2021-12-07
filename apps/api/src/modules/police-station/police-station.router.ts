import { Router } from 'express';
import * as policeStationService from './police-station.service';

const router = Router();

router.get('/list', policeStationService.listStations);

export { router as policeStationRouter };
