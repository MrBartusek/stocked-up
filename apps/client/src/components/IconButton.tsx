import classNames from 'classnames';
import React from 'react';
import { IconType } from 'react-icons';
import { BsPlusCircle } from 'react-icons/bs';
import Button, { ButtonProps } from './Button';

export interface IconButtonProps extends ButtonProps {
	icon?: IconType;
}

function IconButton({ icon, ...props }: IconButtonProps) {
	const iconElement = React.createElement(icon || BsPlusCircle, { size: 20 });

	return (
		<Button
			{...props}
			className={classNames(props.className, 'flex items-center gap-3')}
		>
			{iconElement} {props.children}
		</Button>
	);
}
export default IconButton;
