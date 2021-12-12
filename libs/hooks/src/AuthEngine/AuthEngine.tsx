import { createContext, useContext, useState } from 'react';
import { SessionManager } from './SessionManager';

const AuthContext = createContext<AuthContextType>({
	session: new SessionManager(),
	setSession: () => console.warn('Not provided')
});

type AuthContextType = {
	session: SessionManager;
	setSession: (newSession: SessionManager) => void;
};

export const AuthProvider = AuthContext.Provider;
export const useAuthApi = () => useContext(AuthContext);

export function AuthEngine({ children, authValue }: AuthEngineProps) {
	const [session, setSession] = useState(authValue);

	return <AuthProvider value={{ session, setSession }}>{children}</AuthProvider>;
}

interface AuthEngineProps {
	authValue: SessionManager;
	children: React.ReactNode;
}
