import React from 'react';
import { IconType } from 'react-icons';

export interface FeaturesListElementProps {
	icon: IconType;
	children: React.ReactNode;
}

function FeaturesListElement({ icon, children }: FeaturesListElementProps) {
	const iconElement = React.createElement(icon, { className: 'text-primary', size: 32 });

	return (
		<li className="my-6 flex items-center justify-center gap-3 text-xl xl:justify-normal">
			{iconElement}
			<span>{children}</span>
		</li>
	);
}
export default FeaturesListElement;
