import Joi from 'joi';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { CreateCriminalDto } from '@kaiyeadu/api-interfaces/dtos';
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
		bond,
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
		validateBond(bond),
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
