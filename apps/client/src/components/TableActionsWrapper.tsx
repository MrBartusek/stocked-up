import React from 'react';

export interface TableActionsWrapperProps {
	children?: React.ReactNode;
}

function TableActionsWrapper({ children }: TableActionsWrapperProps) {
	return <div className="flex flex-row items-center">{children}</div>;
}
export default TableActionsWrapper;
