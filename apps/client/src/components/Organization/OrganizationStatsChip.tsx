import React from 'react';
import { IconType } from 'react-icons';

export interface OrganizationStatsChip {
	icon: IconType;
	children: React.ReactNode;
}

function OrganizationStatsChip({ icon, children }: OrganizationStatsChip) {
	const iconElement = React.createElement(icon);

	return (
		<div className="flex items-center gap-1 rounded-xl bg-gray-150 px-2 py-1 text-sm">
			<span className="text-primary">{iconElement}</span>
			<span>{children}</span>
		</div>
	);
}
export default OrganizationStatsChip;
