import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface ActionButtonProps extends Omit<ButtonProps, 'children'> {
	icon: IconType;
}

function ActionButton({ icon, className, ...props }: ActionButtonProps) {
	const iconElement = React.createElement(icon, { className });

	return (
		<button
			{...props}
			className="rounded-md p-2 hover:bg-gray-300"
		>
			{iconElement}
		</button>
	);
}
export default ActionButton;
