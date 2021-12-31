import { Transaction, Op } from 'sequelize';
import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';
import { ICaseInput } from '@kaiyeadu/api-interfaces/models';
import { db } from '$api/root/connections';
import { ClientError } from '$api/errors';
import { logger } from '$api/tools';
import { Case } from './case.model';
import { ActiveCase } from '../active-case/active-case.model';
import { getActiveCasesOf } from '../active-case/active-case.repository';
import { getPSNameById } from '../police-station/police-station.repository';

export function create(caseDetails: ICaseInput) {
	return Case.build(caseDetails).save();
}

export function addCases(criminal: string, cases: CaseDto[], transaction?: Transaction) {
	logger.debug('Creating cases...');

	if (!cases?.length) return Promise.resolve([]);

	return Promise.all(
		cases.map(async caseItem => {
			const {
				police_station,
				crime_number,
				under_section,
				stage,
				remarks,
				date,
				...activeCaseDetails
			} = caseItem;

			const commonDetails: ICaseInput = {
				criminal,
				police_station,
				crime_number,
				under_section,
				stage,
				remarks,
				date
			};

			// todo: find a way to throw if pol_st is not found
			const $case = await Case.build(commonDetails).save({ transaction });

			if (!caseItem.is_active) return $case;

			const activeCase = ActiveCase.build({ ...activeCaseDetails, case: $case.id, criminal });
			return Promise.all([$case, activeCase.save({ transaction })]);
		})
	);
}

export async function getCaseDetails(caseId: string, transaction?: Transaction) {
	const caseDetails = await Case.findByPk(caseId, { transaction, raw: true });
	const psName = await getPSNameById(caseDetails.police_station);

	return { ...caseDetails, police_station: psName };
}

export async function getAllCasesOf(criminal: string, transaction?: Transaction) {
	return Promise.all(
		(
			await Case.findAll({
				where: { criminal },
				attributes: { exclude: ['criminal'] },
				transaction,
				raw: true
			})
		).map(async c => ({ ...c, police_station: await getPSNameById(c.police_station) }))
	);
}

// this function is cpu intensive
export async function getInactiveCasesOf(criminal: string, transaction?: Transaction) {
	const allCases = await getAllCasesOf(criminal, transaction);

	const activeCases = await getActiveCasesOf(criminal, transaction);

	return allCases.filter(c => !activeCases.some(ac => ac.crime_number === c.crime_number));
}

export async function update(caseId: string, details: CaseDto) {
	const transaction = await db.transaction();
	const { police_station, crime_number, under_section, stage, remarks, date, is_active, ...acd } =
		details;
	const caseDetails = {
		police_station,
		crime_number,
		under_section,
		stage,
		remarks,
		date
	};

	const $case = await Case.findByPk(caseId, { transaction });

	if (!$case) throw new ClientError('Case not found', 404);

	await $case.update(caseDetails, { transaction });

	if (!is_active) {
		await ActiveCase.destroy({ where: { case: caseId }, transaction });
		await transaction.commit();
		return $case;
	}

	const [activeCase] = await ActiveCase.findOrBuild({
		where: { case: caseId },
		transaction
	});

	await activeCase.update(acd, { transaction });
	await transaction.commit();

	return $case;
}

export async function removeCasesOf(criminal: string, transaction?: Transaction) {
	const cases = await Case.findAll({
		where: { criminal },
		transaction,
		attributes: ['id'],
		raw: true
	});

	// ! needs testing
	await ActiveCase.destroy({
		where: {
			[Op.or]: {
				...cases.map(c => ({
					case: c.id
				}))
			}
		},
		transaction
	});

	return Case.destroy({ where: { criminal }, transaction });
}

export function remove(id: string) {
	return Case.destroy({ where: { id } });
}
