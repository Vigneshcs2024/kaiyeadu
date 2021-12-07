import { SectionWithNav, BackgroundContainer } from '@kaiyeadu/ui/components';

export default function Home() {
	return (
		<SectionWithNav>
			<BackgroundContainer
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexWrap: 'wrap'
				}}>
				<h1>Home page</h1>
			</BackgroundContainer>
		</SectionWithNav>
	);
}
