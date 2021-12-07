import { SectionWithNav, Sidebar } from '@kaiyeadu/ui/components';

export default function Home() {
	return (
		<SectionWithNav>
			<Sidebar
				content={[
					{ title: 'Home', path: '/' },
					{ title: 'Update Proposals', path: '/' },
					{ title: 'Reset Password', path: '/' },
					{ title: 'Logout' }
				]}
			/>
			<h1>Home page</h1>
		</SectionWithNav>
	);
}
