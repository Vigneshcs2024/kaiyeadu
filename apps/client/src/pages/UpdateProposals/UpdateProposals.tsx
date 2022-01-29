import styled from 'styled-components';
import { Button, TextArea } from '@kaiyeadu/ui/components';
import { Icon } from '@iconify/react';

export default function UpdateProposals({
	setModal
}: {
	setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
				<TextArea label='Changes to be made' />
				<BottomContainer>
					<Button title='Submit' onClick={() => null} />
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
