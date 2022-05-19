import { Icon } from '@iconify/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface AccordionProps {
	title: string;
	children: ReactNode;
	style?: CSSProperties;
}

export function Accordion({ title, children, style }: AccordionProps) {
	const [active, setActive] = useState<boolean>(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const toggleActive = () => {
		setActive(o => !o);
	};

	useEffect(() => {
		if (contentRef.current) {
			contentRef.current.style.maxHeight = active ? '100%' : '0px';
		}
	}, [contentRef, active]);

	return (
		<AccordionContainer style={style}>
			<AccordionTitle onClick={toggleActive}>
				<h3>{title}</h3>
				<span>
					<Chevron
						icon='akar-icons:chevron-down'
						width={20}
						isActive={active}
						color='#C4171C'
					/>
				</span>
			</AccordionTitle>

			<AccordionContent ref={contentRef}>{children}</AccordionContent>
		</AccordionContainer>
	);
}

const AccordionContainer = styled.div`
	width: 100%;
	overflow-x: hidden;
	padding: 1rem;
	border-radius: 0.8rem;
	box-shadow: 7px 7px 1.5rem ${props => props.theme.lightGrey};
	transition: all 0.1s ease-in-out;

	&:hover {
		box-shadow: 1px 1px 1.5rem ${props => `${props.theme.primary}50`};
	}
`;

const AccordionContent = styled.div`
	transition: max-height 0.4s ease-in-out;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
`;

const AccordionTitle = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	min-width: 100%;
	padding: 1rem;
	outline: none;
	border: none;
	background-color: ${props => props.theme.white};
	cursor: pointer;

	& > h3 {
		font-size: 1.7rem;
		color: ${props => props.theme.primary};
	}
`;

const Chevron = styled(Icon)<{ isActive: boolean }>`
	transform: ${props => (props.isActive ? 'rotate(180deg)' : 'rotate(0deg)')};
	transition: all 0.3s ease-in-out;
`;
