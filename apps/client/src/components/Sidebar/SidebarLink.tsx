import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { Link, LinkProps, useLocation } from 'react-router-dom';

export interface SidebarLinkProps extends LinkProps {
	icon: IconType;
	text: string;
}

function SidebarLink({ icon, text, ...props }: SidebarLinkProps) {
	const location = useLocation();
	const isCurrent = location.pathname == props.to;

	const iconElement = React.createElement(icon, {
		className: 'text-xl text-primary',
	});

	return (
		<Link
			{...props}
			className={classNames('custom-button-simple flex flex-row items-center gap-3', {
				'bg-gray-200 font-semibold': isCurrent,
			})}
		>
			{iconElement} {text}
		</Link>
	);
}

export default SidebarLink;
