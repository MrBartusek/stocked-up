import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { BsBoxArrowUpRight } from 'react-icons/bs';

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface DropdownItemProps extends ButtonProps {
	icon?: IconType;
	externalLink?: boolean;
	active?: boolean;
	children?: string;
}

function DropdownItem({
	children,
	icon,
	className,
	active = false,
	externalLink = false,
	disabled,
	...props
}: DropdownItemProps) {
	const iconElement = icon ? React.createElement(icon) : null;

	return (
		<button
			className={classNames(
				'flex w-full items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gray-150',
				'justify-center',
				{ 'bg-gray-150 text-primary': active },
				{ '!text-gray-300 hover:bg-inherit': disabled },
				className,
			)}
			disabled={active || disabled}
			{...props}
		>
			{iconElement}
			<div className="flex flex-1 items-center justify-between">
				<span>{children}</span>
				{externalLink && <BsBoxArrowUpRight />}
			</div>
		</button>
	);
}
export default DropdownItem;
