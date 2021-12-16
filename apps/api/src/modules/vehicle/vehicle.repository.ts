import { Transaction } from 'sequelize';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { Criminal } from '../criminal/criminal.model';
import { Vehicle } from './vehicle.model';

export function addVehicles(
	criminal: Criminal['id'],
	vehicles: VehicleDto[],
	transaction: Transaction
) {
	logger.debug('Creating Vehicles...');

	if (!vehicles?.length) return Promise.resolve([]);

	return Vehicle.bulkCreate(
		vehicles.map(vehicle => ({ criminal, ...vehicle })),
		{ transaction }
	);
}

export function getAllVehiclesOf(person: string, transaction?: Transaction): Promise<Vehicle[]> {
	return Vehicle.findAll({
		where: { criminal: person },
		attributes: { exclude: ['criminal'] },
		transaction,
		raw: true
	});
}
