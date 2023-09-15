import React from 'react';

export interface SidebarSectionProps {
	name: string;
	children: React.ReactNode;
}

function SidebarSection({ name, children }: SidebarSectionProps) {
	return (
		<div className="flex flex-col gap-2">
			<div className="text-muted text-gray uppercase text-sm">{name}</div>
			<div className="flex flex-col gap-1">{children}</div>
		</div>
	);
}

export default SidebarSection;
