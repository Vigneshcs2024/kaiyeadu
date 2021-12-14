import { CreateCriminalDto } from '@kaiyeadu/api-interfaces/dtos';
import { addAddress } from '../address/address.repository';
import { addAssociates } from '../associate/associate.repository';
import { addBond } from '../bond/bond.repository';
import { addCases } from '../case/case.repository';
import { addFamilyMembers } from '../family-member/family-member.repository';
import { addLastArrest } from '../last-arrest/last-arrest.repository';
import { addLinks } from '../link/link.repository';
import { addModusOperandi } from '../modus-operandi/modus-operandi.repository';
import { addOccupation } from '../occupation/occupation.repository';
import { addOpPlaces } from '../operational-places/operational-places.repository';
import { addVehicles } from '../vehicle/vehicle.repository';
import { Criminal } from './criminal.model';

export async function create(criminalDetails: CreateCriminalDto) {
	const {
		modus_operandi,
		links,
		family_members,
		operational_places,
		last_arrest,
		bond,
		occupation,
		present_address,
		associates,
		vehicles,
		cases,
		...rest
	} = criminalDetails;

	const criminal = await Criminal.build(rest).save();

	await Promise.all([
		addModusOperandi(criminal.id, modus_operandi),
		addCases(criminal.id, cases),
		addBond(criminal.id, bond),
		addAddress(criminal.id, present_address),
		addAssociates(criminal.id, associates),
		addLinks(criminal.id, links),
		addFamilyMembers(criminal.id, family_members),
		addLastArrest(criminal.id, last_arrest),
		addOpPlaces(criminal.id, operational_places),
		addVehicles(criminal.id, vehicles),
		addOccupation(criminal.id, occupation)
	]);

	return criminal;
}
