import React from 'react';

export interface ModelFooterProps {
	children?: React.ReactNode;
}

function ModelFooter({ children }: ModelFooterProps) {
	return (
		<div className="flex items-center gap-4 rounded-b border-t border-gray-300 p-4 md:p-5">
			{children}
		</div>
	);
}
export default ModelFooter;
