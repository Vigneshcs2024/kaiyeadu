import { CreateCriminalDto, CriminalDto } from '@kaiyeadu/api-interfaces/dtos';
import { db } from '$api/root/connections';
import { addAddress, getAddressesOf } from '../address/address.repository';
import { addAssociates, getAssociatesOf } from '../associate/associate.repository';
import { addBonds, getBondsOf } from '../bond/bond.repository';
import { addCases, getInactiveCasesOf } from '../case/case.repository';
import { addFamilyMembers, getFamilyMembersOf } from '../family-member/family-member.repository';
import { addLastArrest, getLastArrest } from '../last-arrest/last-arrest.repository';
import { addLinks, getLinks } from '../link/link.repository';
import { addModusOperandi, getModusOperandi } from '../modus-operandi/modus-operandi.repository';
import { addOccupation, getOccupationsOf } from '../occupation/occupation.repository';
import { addOpPlaces, getOpPlacesOf } from '../operational-places/operational-places.repository';
import { addVehicles, getAllVehiclesOf } from '../vehicle/vehicle.repository';
import { Criminal } from './criminal.model';
import { getActiveCasesOf } from '../active-case/active-case.repository';

export async function create(criminalDetails: CreateCriminalDto) {
	const {
		modus_operandi,
		links,
		family_members,
		operational_places,
		last_arrest,
		bonds,
		occupation,
		addresses,
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
		await addBonds(criminal.id, bonds, transaction);
		await addAddress(criminal.id, addresses, transaction);
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

export async function findById(id: string) {
	const criminal = await Criminal.findByPk(id);
	const activeCases = await getActiveCasesOf(id);
	const cases = await getInactiveCasesOf(id);
	const addresses = await getAddressesOf(id);
	const associates = await getAssociatesOf(id);
	const familyMembers = await getFamilyMembersOf(id);
	const links = await getLinks(id);
	const lastArrest = await getLastArrest(id);
	const modusOperandi = await getModusOperandi(id);
	const operationalPlaces = await getOpPlacesOf(id);
	const vehicles = await getAllVehiclesOf(id);
	const occupation = await getOccupationsOf(id);
	const bonds = await getBondsOf(id);

	const fullDetails: CriminalDto = {
		...criminal,
		activeCases,
		cases,
		addresses,
		associates,
		familyMembers,
		links,
		lastArrest,
		modusOperandi,
		operationalPlaces,
		vehicles,
		occupation,
		bonds
	};

	return fullDetails;
}
