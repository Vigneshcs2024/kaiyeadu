import styled from 'styled-components';
import { Icon } from '@iconify/react';

import { Button } from '@kaiyeadu/ui/components';
import { useRequest } from '@kaiyeadu/hooks';
import toast from 'react-hot-toast';
import { CustomAxiosError } from '../interface';

export default function DeleteModal({
	setModal,
	url
}: {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
	url: string;
}) {
	const { request } = useRequest();

	const deleteItem = async () => {
		try {
			const res = await request.delete(url);
			toast.success(res.data.message);
			setModal(false);
			window.location.reload();
		} catch (err) {
			(err as CustomAxiosError).handleAxiosError?.();
		}
	};

	return (
		<Overlay onClick={() => setModal(false)}>
			<InnerContainer>
				<Icon
					className='close'
					width='35'
					icon='carbon:close'
					color='#000'
					onClick={() => setModal(false)}
				/>
				<h3>Are you sure you want to delete?</h3>
				<BottomContainer>
					<Button title='Yes' onClick={deleteItem} />
					<Button title='No' onClick={() => setModal(false)} />
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
	background-color: ${p => p.theme.white};
	padding: 4rem 1.5rem;
	border-radius: 1rem;

	h1 {
		color: ${p => p.theme.white};
		text-align: center;
		margin-bottom: 1.5em;
		font-size: 3rem;
	}

	h3 {
		color: ${p => p.theme.black};
		text-align: center;
		margin-bottom: 1.5em;
	}

	.close {
		position: absolute;
		right: 0.5rem;
		top: 1rem;
		cursor: pointer;
	}
`;

const BottomContainer = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-direction: row;

	a {
		margin-top: 2em;
		color: ${p => p.theme.white};
	}
`;
