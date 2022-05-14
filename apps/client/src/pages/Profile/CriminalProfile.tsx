import { useState, Fragment } from 'react';

import { ModifyButton, Profile } from '@kaiyeadu/ui/components';

import { UpdateProposals } from '..';

export function CriminalProfile() {
	const [modal, setModal] = useState(false);

	return (
		<Fragment>
			<Profile />
			<ModifyButton icon='ci:edit' width='35' onClick={() => setModal(true)} />
			{modal && <UpdateProposals setModal={setModal} />}
		</Fragment>
	);
}
