import { Icon } from '@iconify/react';
import styled from 'styled-components';

interface StepperProps {
	step: number;
}

export function Stepper({ step }: StepperProps) {
	return (
		<StepperContainer>
			<StarIcon isActive={step >= 1}>
				<h3>1</h3>
				<Icon className='starIcon' icon='bi:star-fill' color='#c4171c' width='75' />
			</StarIcon>
			<Separator isActive={step >= 2} />
			<StarIcon isActive={step >= 2}>
				<h3>2</h3>
				<Icon className='starIcon' icon='bi:star-fill' color='#c4171c' width='75' />
			</StarIcon>
			<Separator isActive={step >= 3} />
			<StarIcon isActive={step >= 3}>
				<h3>3</h3>
				<Icon className='starIcon' icon='bi:star-fill' color='#c4171c' width='75' />
			</StarIcon>
			<Separator isActive={step >= 4} />
			<StarIcon isActive={step >= 4}>
				<h3>4</h3>
				<Icon className='starIcon' icon='bi:star-fill' color='#c4171c' width='75' />
			</StarIcon>
		</StepperContainer>
	);
}

const Separator = styled.div<{ isActive: boolean }>`
	width: 10rem;
	height: 0.2rem;
	border-radius: 25%;
	background-color: ${p => (p.isActive ? p.theme.primary : p.theme.white)} !important;
	transition: left 0.2s linear, all 0.2s ease-out;
`;

const StarIcon = styled.div<{ isActive: boolean }>`
	position: relative;
	width: max-content;

	h3 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		transition: all 0.2s;
		color: ${p => (p.isActive ? p.theme.white : p.theme.black)};
	}

	.starIcon {
		color: ${p => (p.isActive ? p.theme.primary : p.theme.white)} !important;
	}

	@media only screen and (max-width: 550px) {
		.starIcon {
			width: 50px !important;
		}
	}
`;

const StepperContainer = styled.div`
	padding: 2rem 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	@media only screen and (max-width: 550px) {
		padding: 2rem;
	}
`;
