import React from 'react';

export interface ModalTitleProps {
	children?: React.ReactNode;
}

function ModalTitle({ children }: ModalTitleProps) {
	return <h2 className="text-2xl">{children}</h2>;
}
export default ModalTitle;
