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
import * as addrRepo from '../address/address.repository';
import * as associateRepo from '../associate/associate.repository';
import * as bondRepo from '../bond/bond.repository';
import * as caseRepo from '../case/case.repository';
import * as famRepo from '../family-member/family-member.repository';
import * as laRepo from '../last-arrest/last-arrest.repository';
import * as linkRepo from '../link/link.repository';
import * as moRepo from '../modus-operandi/modus-operandi.repository';
import * as occRepo from '../occupation/occupation.repository';
import * as opRepo from '../operational-places/operational-places.repository';
import * as vehicleRepo from '../vehicle/vehicle.repository';
import { Criminal } from './criminal.model';
import { getActiveCasesOf } from '../active-case/active-case.repository';
import { removeProposalTo } from '../proposal/proposal.repository';
import { OperationalPlace } from '../models';

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

		await moRepo.addModusOperandi(criminal.id, modus_operandi, transaction);
		await caseRepo.addCases(criminal.id, cases, transaction);
		await bondRepo.addBonds(criminal.id, bonds, transaction);
		await addrRepo.addAddress(criminal.id, addresses, transaction);
		await associateRepo.addAssociates(criminal.id, associates, transaction);
		await linkRepo.addLinks(criminal.id, links, transaction);
		await famRepo.addFamilyMembers(criminal.id, family_members, transaction);
		await laRepo.addLastArrest(criminal.id, last_arrest, transaction);
		await opRepo.addOpPlaces(criminal.id, operational_places, transaction);
		await vehicleRepo.addVehicles(criminal.id, vehicles, transaction);
		await occRepo.addOccupation(criminal.id, occupation, transaction);

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
	const cases = await caseRepo.getInactiveCasesOf(id);
	const addresses = await addrRepo.getAddressesOf(id);
	const associates = await associateRepo.getAssociatesOf(id);
	const familyMembers = await famRepo.getFamilyMembersOf(id);
	const links = await linkRepo.getLinks(id);
	const lastArrest = await laRepo.getLastArrest(id);
	const modusOperandi = await moRepo.getModusOperandi(id);
	const operationalPlaces = await opRepo.getOpPlacesOf(id);
	const vehicles = await vehicleRepo.getAllVehiclesOf(id);
	const occupation = await occRepo.getOccupationsOf(id);
	const bonds = await bondRepo.getBondsOf(id);

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
		await addrRepo.removeAddressesOf(criminal.id, transaction);
		await associateRepo.removeAssociatesOf(criminal.id, transaction);
		await bondRepo.removeBondsOf(criminal.id, transaction);
		await caseRepo.removeCasesOf(criminal.id, transaction);
		await famRepo.removeFamilyMembersOf(criminal.id, transaction);
		await laRepo.removeLastArrestDetailsOf(criminal.id, transaction);
		await linkRepo.removeLinksOf(criminal.id, transaction);
		await moRepo.removeModusOperandisOf(criminal.id, transaction);
		await occRepo.removeOccupationsOf(criminal.id, transaction);
		await opRepo.removeOpPsOf(criminal.id, transaction);
		await vehicleRepo.removeVehiclesOf(criminal.id, transaction);
		await removeProposalTo(criminal.id, transaction);

		criminal.destroy({ transaction });

		await transaction.commit();
	} catch (e) {
		await transaction.rollback();
		throw e;
	}
}

export async function getListByDistrict(
	district: string,
	{ params, pagination }: ListCriminalsQuery
) {
	const criminalIdsByDist = await OperationalPlace.findAll({
		where: {
			district,
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

	return Criminal.findAll({
		where: {
			id: {
				[Op.in]: criminalIdsByDist.map(c => c.criminal)
			}
		},
		attributes: ['name', 'image_url', 'hs_number', 'id'],
		raw: true
	});
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
