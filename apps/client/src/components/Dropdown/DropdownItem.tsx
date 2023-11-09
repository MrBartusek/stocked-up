import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface DropdownItemProps extends ButtonProps {
	icon?: IconType;
	children: string;
}

function DropdownItem({ children, icon, className, ...props }: DropdownItemProps) {
	const iconElement = icon ? React.createElement(icon) : null;

	return (
		<button
			className={classNames(
				'flex w-full items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-150',
				className,
			)}
			{...props}
		>
			{iconElement}
			<span>{children}</span>
		</button>
	);
}
export default DropdownItem;
