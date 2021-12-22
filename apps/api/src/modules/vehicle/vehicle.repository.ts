import { Transaction } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import { VehicleDto } from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
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

export async function update(id: string, vehicle: VehicleDto) {
	const vehicleToUpdate = await Vehicle.findByPk(id);

	if (!vehicleToUpdate) {
		throw new ClientError('Vehicle not found', StatusCodes.NOT_FOUND);
	}

	return vehicleToUpdate.update(vehicle);
}

export function removeVehiclesOf(criminal: string, transaction?: Transaction) {
	return Vehicle.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return Vehicle.destroy({ where: { id } });
}
