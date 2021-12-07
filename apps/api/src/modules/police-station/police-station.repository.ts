import { CreatePSDto } from '@kaiyeadu/api-interfaces/dtos';
import { PoliceStation } from './police-station.model';

export async function listPoliceStations() {
	const stations = await PoliceStation.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	});

	return stations;
}

export async function createPoliceStation(policeStationDetails: CreatePSDto) {
	return await PoliceStation.create(policeStationDetails);
}

export async function getPoliceStation(id: string) {
	return await PoliceStation.findByPk(id, {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	});
}
