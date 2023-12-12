import classNames from 'classnames';
import React from 'react';

type HTMLButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export type buttonVariant = 'primary' | 'secondary' | 'danger';

export interface ButtonProps extends HTMLButtonProps {
	loading?: boolean;
	variant?: buttonVariant;
}

function Button({ loading, variant = 'primary', ...props }: ButtonProps) {
	if (loading) {
		props.disabled = true;
	}

	const colorVariants = {
		primary: 'bg-primary hover:bg-primary-hover',
		secondary: 'bg-secondary hover:bg-secondary-hover',
		danger: 'bg-danger hover:bg-danger-hover',
	};

	return (
		<button
			{...props}
			className={classNames(
				`rounded-md px-3.5 py-2.5 text-light`,
				'transition-opacity',
				colorVariants[variant],
				{ 'pointer-events-none opacity-75': props.disabled },
				props.className,
			)}
		>
			{props.children}
		</button>
	);
}
export default Button;
