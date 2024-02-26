import React from 'react';

export interface FeaturesItemProps {
	icon: React.ReactNode;
	title: string;
	children?: React.ReactNode;
}

function FeaturesItem({ icon, title, children }: FeaturesItemProps) {
	return (
		<div>
			<div className="mb-4 text-6xl text-gray-700">{icon}</div>
			<h3 className="mb-2 text-2xl font-semibold">{title}</h3>
			<p>{children}</p>
		</div>
	);
}
export default FeaturesItem;
