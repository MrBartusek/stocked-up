import classNames from 'classnames';
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
	const iconElement = React.createElement(icon);

	return (
		<button
			{...props}
			className={classNames(
				'rounded-md p-2 hover:bg-gray-300 disabled:pointer-events-none disabled:text-gray-400',
				'flex items-center justify-center active:bg-gray-400',
				className,
			)}
		>
			{iconElement}
		</button>
	);
}
export default ActionButton;
