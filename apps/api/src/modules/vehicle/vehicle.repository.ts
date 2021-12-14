import { Transaction } from 'sequelize';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { Criminal } from '../criminal/criminal.model';
import { Vehicle } from './vehicle.model';

export function addVehicles(
	criminal: Criminal['id'],
	vehicles: VehicleDto[],
	transaction: Transaction
) {
	return Promise.all(vehicles.map(v => Vehicle.build({ ...v, criminal }).save({ transaction })));
}

export function getAllVehiclesOf(person: string, transaction?: Transaction): Promise<Vehicle[]> {
	return Vehicle.findAll({
		where: { criminal: person },
		attributes: { exclude: ['criminal'] },
		transaction
	});
}
