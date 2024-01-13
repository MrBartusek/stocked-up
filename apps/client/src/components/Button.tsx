import classNames from 'classnames';
import React from 'react';

type HTMLButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export type buttonVariant =
	| 'primary'
	| 'primary-outline'
	| 'secondary'
	| 'secondary-outline'
	| 'danger';

export interface ButtonProps extends HTMLButtonProps {
	loading?: boolean;
	variant?: buttonVariant;
}

function Button({ loading, variant = 'primary', ...props }: ButtonProps) {
	if (loading) {
		props.disabled = true;
	}

	const colorVariants: { [key in buttonVariant]: string } = {
		primary: 'bg-primary hover:bg-primary-hover',
		secondary: 'bg-secondary hover:bg-secondary-hover',
		danger: 'bg-danger hover:bg-danger-hover',
		'primary-outline': 'border border-primary text-primary hover:bg-primary hover:text-light',
		'secondary-outline':
			'border border-secondary text-secondary hover:bg-secondary hover:text-light',
	};

	return (
		<button
			{...props}
			className={classNames(
				'rounded-md px-3.5 py-2.5 text-light transition-all',
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
