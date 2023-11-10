import { IconType } from 'react-icons';
import Button, { ButtonProps } from './Button';
import classNames from 'classnames';
import React from 'react';
import { BsPlusCircle } from 'react-icons/bs';

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
