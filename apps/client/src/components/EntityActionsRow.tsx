import React from 'react';

export interface EntityActionsRowProps {
	children: React.ReactNode;
}

function EntityActionsRow({ children }: EntityActionsRowProps) {
	return (
		<div className="mt-6">
			<div className="mb-4">Actions: </div>
			<div className="flex gap-4 text-sm">{children}</div>
		</div>
	);
}
export default EntityActionsRow;
