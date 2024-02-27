import React from 'react';
import { Link, To } from 'react-router-dom';

export interface WelcomeActionLinkProps {
	to: To;
	icon: React.ReactNode;
	children?: React.ReactNode;
}

function WelcomeActionLink({ to, icon, children }: WelcomeActionLinkProps) {
	return (
		<Link
			to={to}
			className="flex items-center gap-3 rounded-md px-4 py-2.5 transition-colors hover:bg-gray-200"
		>
			<div className="rounded-md  bg-primary p-2 text-white">{icon}</div>
			{children}
		</Link>
	);
}
export default WelcomeActionLink;
