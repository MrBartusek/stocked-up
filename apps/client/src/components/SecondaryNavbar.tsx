import React from 'react';
import { IconType } from 'react-icons';
import Container from './Container';

export interface SecondaryNavbarProps {
	icon: IconType;
	title: string;
	actions?: React.ReactNode;
}

export function SecondaryNavbar({ icon, title, actions }: SecondaryNavbarProps) {
	const iconElement = React.createElement(icon);

	return (
		<div className="flex border-b border-gray-300 bg-gray-200 p-6">
			<Container className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-4 text-xl">
					{iconElement}
					<h2>{title}</h2>
				</div>
				{actions}
			</Container>
		</div>
	);
}
