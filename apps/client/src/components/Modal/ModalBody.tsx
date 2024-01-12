import React from 'react';

export interface ModalBodyProps {
	children?: React.ReactNode;
}

function ModalBody({ children }: ModalBodyProps) {
	return <div className="space-y-4 p-4 md:p-5">{children}</div>;
}
export default ModalBody;
