import { Helmet } from 'react-helmet';
import { createContext, useContext } from 'react';
import theme from './theme.values';

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);

export function ThemeEngine({ children }: ThemeEngineProps) {
	return (
		<>
			<Helmet>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;700&display=swap'
				/>
			</Helmet>
			<ThemeProvider value={theme}>{children}</ThemeProvider>
		</>
	);
}

interface ThemeEngineProps {
	children: React.ReactNode;
}

export interface Theme {
	font: string;
}
