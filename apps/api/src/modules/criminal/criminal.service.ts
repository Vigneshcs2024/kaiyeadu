import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateCriminalDto } from '@kaiyeadu/api-interfaces/dtos';
import { logger } from '$api/tools';
import { ApiRequest } from '$api/types';
import { jsonPrettyPrint } from '$api/utilities';
import { validateStringArray, validateUUID } from '$api/utilities/validations';
import { validateCreateAddresses } from '../address/address.validation';
import { validateLinks } from '../link/link.validation';
import { validateCreateCriminal, validateListCriminalsQuery } from './criminal.validation';
import * as criminalRepo from './criminal.repository';
import { validateFamilyMembers } from '../family-member/family-member.validation';
import { validateOperationalPlaces } from '../operational-places/operational-places.validation';
import { validateBonds } from '../bond/bond.validation';
import { validateAddAssociates } from '../associate/associate.validation';
import { validateAddVehicles } from '../vehicle/vehicle.validation';
import { validateCases } from '../case/case.validation';
import { accessLogger } from '$api/tools/access-logger';

export async function create(req: ApiRequest, res: Response) {
	const {
		modus_operandi,
		links,
		family_members,
		operational_places,
		bonds,
		occupation,
		addresses,
		associates,
		vehicles,
		cases,
		...rest
	} = req.body as CreateCriminalDto;

	await Promise.all([
		validateCreateCriminal(rest),
		validateCreateAddresses(addresses),
		validateStringArray(modus_operandi),
		validateLinks(links),
		validateFamilyMembers(family_members),
		validateOperationalPlaces(operational_places),
		validateBonds(bonds),
		validateStringArray(occupation),
		validateAddAssociates(associates),
		validateAddVehicles(vehicles),
		validateCases(cases)
	]);

	const criminal = await criminalRepo.create(req.body);

	accessLogger(req, `Criminal $ is created by &`, criminal.id);

	return res.status(StatusCodes.CREATED).json({
		message: 'Criminal created successfully',
		result: criminal.id
	});
}

export async function getDetails(req: ApiRequest, res: Response) {
	if (!req.params.id || req.params.id.length !== 36) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: 'Missing or invalid criminal ID'
		});
	}

	const criminal = await criminalRepo.getCompleteDetails(req.params.id);

	accessLogger(req, `Details of Criminal $ fetched from DB by &`, criminal.id);

	return res.status(StatusCodes.OK).json({
		message: 'Criminal details retrieved successfully',
		result: criminal
	});
}

export async function getMinimalList(req: ApiRequest, res: Response) {
	const mp = new URLSearchParams(new URL(`http://[::1]/${req.url}`).search);

	const options = {
		count: +mp.get('count'),
		page: +mp.get('page'),
		f: JSON.parse(mp.get('f')),
		q: mp.get('q'),
		s: JSON.parse(mp.get('s'))
	};

	logger.debug(jsonPrettyPrint(options));

	await validateListCriminalsQuery(options);

	const criminals = await criminalRepo.getListMinimal({
		pagination: {
			pageNumber: +options.page,
			resultsPerPage: +options.count
		},
		params: {
			filters: options.f,
			search: options.q,
			sort: options.s
		}
	});

	accessLogger(req, `Criminals fetched from DB by &`);

	return res.status(StatusCodes.OK).json({
		message: 'Criminals retrieved successfully',
		result: criminals
	});
}

export async function updatePersonalDetails(req: ApiRequest, res: Response) {
	const { id } = req.params;
	const {
		modus_operandi,
		links,
		family_members,
		operational_places,
		bonds,
		occupation,
		addresses,
		associates,
		vehicles,
		cases,
		...rest
	} = req.body as CreateCriminalDto;

	await validateUUID(id);

	await Promise.all([
		validateCreateCriminal(rest),
		validateCreateAddresses(addresses),
		validateStringArray(modus_operandi),
		validateLinks(links),
		validateFamilyMembers(family_members),
		validateOperationalPlaces(operational_places),
		validateBonds(bonds),
		validateStringArray(occupation),
		validateAddAssociates(associates),
		validateAddVehicles(vehicles),
		validateCases(cases)
	]);

	await criminalRepo.updateCriminal(id, {
		modus_operandi,
		links,
		family_members,
		operational_places,
		bonds,
		occupation,
		addresses,
		associates,
		vehicles,
		cases,
		id,
		...rest
	});

	accessLogger(req, `Criminal $ updated by &`, id);

	return res.status(StatusCodes.OK).json({
		message: 'Criminal updated successfully'
	});
}

export async function remove(req: ApiRequest, res: Response) {
	const { id } = req.params;

	await validateUUID(id);

	await criminalRepo.remove(id);

	accessLogger(req, `Criminal $ removed by &`, id);

	return res.status(StatusCodes.OK).json({
		message: 'Criminal removed successfully'
	});
}

export async function listByDistrict(req: ApiRequest, res: Response) {
	const { district } = req.params;
	const mp = new URLSearchParams(new URL(`http://[::1]/${req.url}`).search);
	const options = {
		count: +mp.get('count'),
		page: +mp.get('page'),
		f: JSON.parse(mp.get('f')),
		q: mp.get('q'),
		s: JSON.parse(mp.get('s'))
	};

	logger.debug(jsonPrettyPrint(options));

	await validateListCriminalsQuery(options);

	await validateStringArray([district]);

	const result = await criminalRepo.getListByDistrict(district, {
		pagination: {
			pageNumber: +options.page,
			resultsPerPage: +options.count
		},
		params: {
			filters: options.f,
			search: options.q,
			sort: options.s
		}
	});

	accessLogger(req, `Criminals fetched in-order of district by &`);

	return res.status(StatusCodes.OK).json({ message: 'Criminals retrieved successfully', result });
}
