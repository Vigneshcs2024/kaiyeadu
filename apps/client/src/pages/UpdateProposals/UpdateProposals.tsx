import { useState, useCallback, useEffect } from 'react';

import styled from 'styled-components';
import toast from 'react-hot-toast';
import { Button, TextArea, Loader } from '@kaiyeadu/ui/components';
import { Icon } from '@iconify/react';
import { useRequest } from '@kaiyeadu/hooks';
import { CustomAxiosError } from '@kaiyeadu/ui/interface';
import { Requests } from '@kaiyeadu/api-interfaces/constants/requests.enum';
import { useLocation } from 'react-router-dom';

export default function UpdateProposals({
	setModal
}: {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [description, setDescription] = useState('');
	const { request } = useRequest();

	const { state: id } = useLocation();

	const getCriminal = async () => {
		return null;
	};

	const createProposals = async () => {
		setIsLoading(true);

		try {
			const res = await request.post(Requests.USER_UPDATE_PROPOSAL, {
				criminal: id,
				description
			});
			toast.success(res.data.message);
			setTimeout(() => {
				setModal(false);
			}, 1000);
		} catch (error) {
			(error as CustomAxiosError).handleAxiosError?.();
		}
		setIsLoading(false);
	};

	const memoizedGetData = useCallback(getCriminal, []);

	useEffect(() => {
		memoizedGetData();
	}, [memoizedGetData]);

	return (
		<Overlay>
			<InnerContainer>
				<Icon
					className='close'
					width='35'
					icon='carbon:close'
					color='#fff'
					onClick={() => setModal(false)}
				/>
				<TextArea
					label='Changes to be made'
					onChange={event => setDescription(event.target.value)}
				/>
				<BottomContainer>
					<Button title='Submit' onClick={createProposals} />
				</BottomContainer>
			</InnerContainer>
		</Overlay>
	);
}

const Overlay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgb(0, 0, 0, 0.75);
	position: fixed;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
`;

const InnerContainer = styled.div`
	width: 80%;
	max-width: 500px;
	position: relative;

	h1 {
		color: ${p => p.theme.white};
		text-align: center;
		margin-bottom: 1.5em;
		font-size: 3rem;
	}

	.close {
		position: absolute;
		right: 0;
		top: -0.5rem;
		cursor: pointer;
	}
`;

const BottomContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	a {
		margin-top: 2em;
		color: ${p => p.theme.white};
	}
`;
