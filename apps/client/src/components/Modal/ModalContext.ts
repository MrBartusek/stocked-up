import { createContext } from 'react';

interface ModalContextType {
	close: () => void;
}

export const ModalContext = createContext<ModalContextType>({
	close: () => null,
});
