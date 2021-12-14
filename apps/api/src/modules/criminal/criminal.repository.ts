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

	await addModusOperandi(criminal.id, modus_operandi);
	await addCases(criminal.id, cases);
	await addBond(criminal.id, bond);
	await addAddress(criminal.id, present_address);
	await addAssociates(criminal.id, associates);
	await addLinks(criminal.id, links);
	await addFamilyMembers(criminal.id, family_members);
	await addLastArrest(criminal.id, last_arrest);
	await addOpPlaces(criminal.id, operational_places);
	await addVehicles(criminal.id, vehicles);
	await addOccupation(criminal.id, occupation);

	return criminal;
}
