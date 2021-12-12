import { CaseDto } from '@kaiyeadu/api-interfaces/dtos';
import { ICaseInput } from '@kaiyeadu/api-interfaces/models';
import { ActiveCase } from '../active-case/active-case.model';
import { Case } from './case.model';

export function create(caseDetails: ICaseInput) {
	return Case.build(caseDetails).save();
}

export function addCases(criminal: string, cases: CaseDto[]) {
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

			const $case = await Case.build(commonDetails).save();

			if (!caseItem.is_active) return $case;

			// ! stage is present in both case and active case
			const activeCase = ActiveCase.build({ ...activeCaseDetails, stage, case: $case.id });
			return Promise.all([$case, activeCase.save()]);
		})
	);
}
