import { createContext } from 'react';
import { CurrentAppContextType } from '../../useAppContext';

export const CurrentAppContext = createContext<CurrentAppContextType>({ isLoading: true } as any);
