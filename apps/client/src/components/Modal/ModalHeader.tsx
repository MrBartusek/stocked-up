import React from 'react';
import ModalCloseX from './ModalCloseX';

export interface ModalHeaderProps {
	children?: React.ReactNode;
	closeButton?: boolean;
}

function ModalHeader({ children, closeButton = false }: ModalHeaderProps) {
	return (
		<div className="flex items-center justify-between rounded-t border-b border-gray-300 p-4 md:p-5">
			{children}
			{closeButton && <ModalCloseX />}
		</div>
	);
}
export default ModalHeader;
