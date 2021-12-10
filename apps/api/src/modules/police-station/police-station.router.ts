import { Router } from 'express';
import * as policeStationService from './police-station.service';

const router = Router();

router.get('/:id', policeStationService.findById);
router.get('/list', policeStationService.getList);
router.get('/names', policeStationService.getNames);
router.post('/create', policeStationService.create);

export { router as policeStationRouter };
