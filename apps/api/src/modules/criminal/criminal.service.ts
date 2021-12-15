import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateCriminalDto, ListCriminalsDto } from '@kaiyeadu/api-interfaces/dtos';
import { ApiRequest } from '$api/types';
import { validateCreateAddresses } from '../address/address.validation';
import { validateLinks } from '../link/link.validation';
import { validateCreateCriminal } from './criminal.validation';
import * as criminalRepo from './criminal.repository';
import { validateFamilyMembers } from '../family-member/family-member.validation';
import { validateOperationalPlaces } from '../operational-places/operational-places.validation';
import { validateLastArrest } from '../last-arrest/last-arrest.validation';
import { validateBond } from '../bond/bond.validation';
import { validateAddAssociates } from '../associate/associate.validation';
import { validateAddVehicles } from '../vehicle/vehicle.validation';
import { validateCases } from '../case/case.validation';

export async function create(req: ApiRequest, res: Response) {
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
	} = req.body as CreateCriminalDto;

	await Promise.all([
		validateCreateCriminal(rest),
		validateCreateAddresses(addresses),
		Joi.array().items(Joi.string()).validateAsync(modus_operandi),
		validateLinks(links),
		validateFamilyMembers(family_members),
		validateOperationalPlaces(operational_places),
		validateLastArrest(last_arrest),
		validateBond(bonds),
		Joi.array().items(Joi.string()).validateAsync(occupation),
		validateAddAssociates(associates),
		validateAddVehicles(vehicles),
		validateCases(cases)
	]);

	const criminal = await criminalRepo.create(req.body);

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

	return res.status(StatusCodes.OK).json({
		message: 'Criminal details retrieved successfully',
		result: criminal
	});
}

export async function getMinimalList(req: ApiRequest, res: Response) {
	const { count, page, f, q, s } = req.query;

	// todo: add validation for count, page, f, q, s

	const criminals = await criminalRepo.getListMinimal({
		pagination: {
			pageNumber: +page,
			resultsPerPage: +count
		},
		params: {
			filters: f as ListCriminalsDto['f'],
			search: q as string,
			sort: s as ListCriminalsDto['s']
		}
	});

	return res.status(StatusCodes.OK).json({
		message: 'Criminals retrieved successfully',
		result: criminals
	});
}
