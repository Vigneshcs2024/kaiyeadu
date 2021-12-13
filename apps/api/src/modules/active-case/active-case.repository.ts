import { getCaseDetails } from '../case/case.repository';
import { Criminal } from '../models';
import { ActiveCase } from './active-case.model';

export async function getActiveCasesOf(criminal: Criminal['id']) {
	const activeCases = await ActiveCase.findAll({
		where: { criminal },
		attributes: { exclude: ['criminal'] }
	});

	const fullCaseDetails = await Promise.all(
		activeCases.map(async activeCase => {
			const { case: caseId, ...extraDetails } = activeCase;
			const { ...commonDetails } = await getCaseDetails(caseId);
			return { ...commonDetails, ...extraDetails };
		})
	);

	return fullCaseDetails;
}
