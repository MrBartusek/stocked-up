import { createContext } from 'react';
import { CurrentAppContextType } from '../hooks/useAppContext';

export const CurrentAppContext = createContext<CurrentAppContextType>({ isLoading: true } as any);
