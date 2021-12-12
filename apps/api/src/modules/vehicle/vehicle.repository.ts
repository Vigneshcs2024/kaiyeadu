import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Vehicle } from './vehicle.model';

export function addVehicles(criminal: Criminal['id'], vehicles: VehicleDto[]) {
	return Promise.all(vehicles.map(v => Vehicle.build({ ...v, criminal }).save()));
}
