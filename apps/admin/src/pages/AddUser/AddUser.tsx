import { BackgroundContainer, Button, DropDownList, TextField } from '@kaiyeadu/ui/components';
import styled from 'styled-components';

export function AddUser() {
	return (
		<BackgroundContainer>
			<Layout>
				<h1>Add User</h1>
				<form>
					<TextField label='Name' />
					<TextField label='GPF Number' />
					<TextField label='Email' type='email' />
					<TextField label='Phone' type='tel' />
					<TextField label='Police Station' />
					<TextField label='Designation' />
					<DropDownList label='Role' id='ddl' items={['user', 'admin', 'master']} />
					<Button type='submit'>Add User</Button>
				</form>
			</Layout>
		</BackgroundContainer>
	);
}

const Layout = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	color: ${p => p.theme.white};

	h1 {
		font-size: 4.5rem;
		margin: 1em;
	}
`;
