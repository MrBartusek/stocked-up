import { createContext } from 'react';
import { UseUserType } from '../hooks/useUser';

export const UserContext = createContext<UseUserType>({
	isLoading: true,
	isAuthenticated: false,
} as any);
