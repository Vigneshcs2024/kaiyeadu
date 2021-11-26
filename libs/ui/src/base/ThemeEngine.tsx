import { createContext, useContext } from 'react';
import theme from './theme.values';

const ThemeContext = createContext<Theme>(theme);

export const ThemeProvider = ThemeContext.Provider;
export const useTheme = () => useContext(ThemeContext);

export function ThemeEngine({ children }: ThemeEngineProps) {
	return <ThemeProvider value={theme}>{children}</ThemeProvider>;
}

interface ThemeEngineProps {
	children: React.ReactNode;
}

export interface Theme {
	font: string;
}
