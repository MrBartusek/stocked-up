import {
	ReferenceType,
	useClick,
	useDismiss,
	useFloating,
	useInteractions,
} from '@floating-ui/react';
import React, { createContext, useState } from 'react';

type RefsType = {
	reference: React.MutableRefObject<ReferenceType | null>;
	floating: React.MutableRefObject<HTMLElement | null>;
	setReference: (node: ReferenceType | null) => void;
	setFloating: (node: HTMLElement | null) => void;
};

export const DropdownContext = createContext<{
	refs: RefsType;
	isOpen: boolean;
	getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>;
	getFloatingProps: (
		userProps?: React.HTMLProps<HTMLElement> | undefined,
	) => Record<string, unknown>;
	floatingStyles: React.CSSProperties;
}>(null!);

export interface DropdownProps {
	children: React.ReactNode;
}

function Dropdown({ children }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
	});

	const click = useClick(context);
	const dismiss = useDismiss(context, {
		ancestorScroll: true,
		bubbles: true,
		referencePress: true,
	});

	const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

	return (
		<DropdownContext.Provider
			value={{ refs, isOpen, getReferenceProps, getFloatingProps, floatingStyles }}
		>
			{children}
		</DropdownContext.Provider>
	);
}
export default Dropdown;
