import styled from 'styled-components';

export default function ActiveType({
	values,
	type,
	setType
}: {
	values: string[];
	type: string;
	setType: (value: React.SetStateAction<string>) => void;
}) {
	return (
		<ul style={{ display: 'flex', gap: '1em' }}>
			{values.map(val => (
				<Item active={val === type} key={val} onClick={() => setType(val)}>
					{val}
				</Item>
			))}
		</ul>
	);
}

const Item = styled.li<{ active: boolean }>`
	cursor: pointer;
	padding: 1em;
	border-radius: 10px;
	background-color: ${p => p.theme.white};
	color: ${p => (p.active ? p.theme.primary : p.theme.black)};
`;
