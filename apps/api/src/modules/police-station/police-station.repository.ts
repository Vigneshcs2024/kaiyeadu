import { PoliceStation } from './police-station.model';

export async function listPoliceStations() {
	const stations = await PoliceStation.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	});

	return stations;
}
