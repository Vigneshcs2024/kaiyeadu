import { CreateCriminalDto } from '@kaiyeadu/api-interfaces/dtos';
import { db } from '$api/root/connections';
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

	const transaction = await db.transaction();

	try {
		const criminal = await Criminal.build(rest).save({ transaction });

		await addModusOperandi(criminal.id, modus_operandi, transaction);
		await addCases(criminal.id, cases, transaction);
		await addBond(criminal.id, bond, transaction);
		await addAddress(criminal.id, present_address, transaction);
		await addAssociates(criminal.id, associates, transaction);
		await addLinks(criminal.id, links, transaction);
		await addFamilyMembers(criminal.id, family_members, transaction);
		await addLastArrest(criminal.id, last_arrest, transaction);
		await addOpPlaces(criminal.id, operational_places, transaction);
		await addVehicles(criminal.id, vehicles, transaction);
		await addOccupation(criminal.id, occupation, transaction);
		transaction.commit();
		return criminal;
	} catch (err) {
		await transaction.rollback();
		throw err;
	}
}
