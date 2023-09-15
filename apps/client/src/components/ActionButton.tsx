import React from 'react';
import { IconType } from 'react-icons';

export interface ActionButtonProps {
	icon: IconType;
	className?: string;
}

function ActionButton({ icon, className }: ActionButtonProps) {
	const iconElement = React.createElement(icon, { className });

	return <button className="rounded-md p-2 hover:bg-gray-300">{iconElement}</button>;
}
export default ActionButton;
