import { Op } from 'sequelize';
import { StatusCodes } from 'http-status-codes';
import {
	CreateCriminalDto,
	CriminalDto,
	FilterableCriminalParams,
	SortableCriminalParameters,
	UpdateCriminalPersonalDetailsDto
} from '@kaiyeadu/api-interfaces/dtos';
import { ClientError } from '$api/errors';
import { db } from '$api/root/connections';
import { addAddress, getAddressesOf, removeAddressesOf } from '../address/address.repository';
import {
	addAssociates,
	getAssociatesOf,
	removeAssociatesOf
} from '../associate/associate.repository';
import { addBonds, getBondsOf, removeBondsOf } from '../bond/bond.repository';
import { addCases, getInactiveCasesOf, removeCasesOf } from '../case/case.repository';
import {
	addFamilyMembers,
	getFamilyMembersOf,
	removeFamilyMembersOf
} from '../family-member/family-member.repository';
import {
	addLastArrest,
	getLastArrest,
	removeLastArrestDetailsOf
} from '../last-arrest/last-arrest.repository';
import { addLinks, getLinks, removeLinksOf } from '../link/link.repository';
import {
	addModusOperandi,
	getModusOperandi,
	removeModusOperandisOf
} from '../modus-operandi/modus-operandi.repository';
import {
	addOccupation,
	getOccupationsOf,
	removeOccupationsOf
} from '../occupation/occupation.repository';
import {
	addOpPlaces,
	getOpPlacesOf,
	removeOpPsOf
} from '../operational-places/operational-places.repository';
import { addVehicles, getAllVehiclesOf, removeVehiclesOf } from '../vehicle/vehicle.repository';
import { Criminal } from './criminal.model';
import { getActiveCasesOf } from '../active-case/active-case.repository';
import { removeProposalTo } from '../proposal/proposal.repository';

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

export async function getCompleteDetails(id: string) {
	const criminal = await Criminal.findByPk(id, { raw: true });

	if (!criminal) {
		throw new ClientError('Criminal not found', StatusCodes.NOT_FOUND);
	}

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

export async function getListMinimal({ params, pagination }: ListCriminalsQuery) {
	return await Criminal.findAll({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.like]: `%${params.search ?? ''}%`
					}
				},
				{
					alias_name: {
						[Op.like]: `%${params.search ?? ''}%`
					}
				}
			],
			...params.filters
		},
		offset: (pagination.pageNumber - 1) * pagination.resultsPerPage || 0,
		limit: pagination.resultsPerPage || 10,
		attributes: ['name', 'image_url', 'hs_number', 'id'],
		order: [params.sort ? [params.sort.key, params.sort.order] : ['name', 'ASC']],
		raw: true
	});
}

export async function update(id: string, updates: UpdateCriminalPersonalDetailsDto) {
	const criminal = await Criminal.findByPk(id);
	if (!criminal) {
		throw new ClientError('Could not find a criminal associated to the given id', 404);
	}
	return criminal.update(updates);
}

export async function remove(id: string) {
	const criminal = await Criminal.findByPk(id);
	if (!criminal) {
		throw new ClientError('Could not find a criminal associated to the given id', 404);
	}

	const transaction = await db.transaction();

	try {
		removeAddressesOf(criminal.id, transaction);
		removeAssociatesOf(criminal.id, transaction);
		removeBondsOf(criminal.id, transaction);
		removeCasesOf(criminal.id, transaction);
		removeFamilyMembersOf(criminal.id, transaction);
		removeLastArrestDetailsOf(criminal.id, transaction);
		removeLinksOf(criminal.id, transaction);
		removeModusOperandisOf(criminal.id, transaction);
		removeOccupationsOf(criminal.id, transaction);
		removeOpPsOf(criminal.id, transaction);
		removeVehiclesOf(criminal.id, transaction);
		removeProposalTo(criminal.id, transaction);

		criminal.destroy({ transaction });

		await transaction.commit();
	} catch (e) {
		await transaction.rollback();
		throw e;
	}
}

export type ListCriminalsQuery = {
	params: {
		search?: string;
		filters?: Partial<FilterableCriminalParams>;
		sort?: {
			key: SortableCriminalParameters;
			order: 'ASC' | 'DESC';
		};
	};
	pagination: { pageNumber: number; resultsPerPage: number };
};
