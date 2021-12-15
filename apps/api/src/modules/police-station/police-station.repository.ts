import { CreatePSDto } from '@kaiyeadu/api-interfaces/dtos';
import { Op } from 'sequelize';
import { User } from '../user/user.model';
import { PoliceStation } from './police-station.model';

export async function getAll() {
	const stations = await PoliceStation.findAll({
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	});

	return stations;
}

export async function getNames(partialName?: string) {
	const stations: Pick<User, 'name'>[] = await PoliceStation.findAll({
		where: {
			name: {
				[Op.like]: `%${partialName ?? ''}%`
			}
		},
		attributes: ['name']
	});

	return stations;
}

export async function create(policeStationDetails: CreatePSDto) {
	return await PoliceStation.create(policeStationDetails);
}

export async function getById(id: string) {
	return await PoliceStation.findByPk(id, {
		attributes: { exclude: ['createdAt', 'updatedAt'] }
	});
}

export async function getPSNameById(id: string) {
	return (await PoliceStation.findByPk(id, { attributes: ['name'], raw: true })).name;
}
