import { Transaction } from 'sequelize';
import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';
import { ICaseInput } from '@kaiyeadu/api-interfaces/models';
import { logger } from '$api/tools';
import { ActiveCase } from '../active-case/active-case.model';
import { getActiveCasesOf } from '../active-case/active-case.repository';
import { getPSNameById } from '../police-station/police-station.repository';
import { Case } from './case.model';

export function create(caseDetails: ICaseInput) {
	return Case.build(caseDetails).save();
}

export function addCases(criminal: string, cases: CaseDto[], transaction: Transaction) {
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
