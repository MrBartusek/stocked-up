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
	| 'danger'
	| 'danger-outline'
	| 'success'
	| 'success-outline';

export type buttonSizes = 'regular' | 'large';

export interface ButtonProps extends HTMLButtonProps {
	loading?: boolean;
	variant?: buttonVariant;
	size?: buttonSizes;
}

function Button({ loading, variant = 'primary', size = 'regular', ...props }: ButtonProps) {
	if (loading) {
		props.disabled = true;
	}

	const colorVariants: { [key in buttonVariant]: string } = {
		primary: 'bg-primary hover:bg-primary-hover text-light',
		'primary-outline': 'border border-primary text-primary hover:bg-primary hover:text-light',
		secondary: 'bg-secondary hover:bg-secondary-hover text-light',
		'secondary-outline':
			'border border-secondary text-secondary hover:bg-secondary hover:text-light',
		danger: 'bg-danger hover:bg-danger-hover text-light',
		'danger-outline': 'border border-danger text-danger hover:bg-danger hover:text-light',
		success: 'bg-success hover:bg-success-hover text-light',
		'success-outline': 'border border-success text-success hover:bg-success hover:text-light',
	};

	const colorSizes: { [key in buttonSizes]: string } = {
		regular: 'text-md px-3.5 py-2.5',
		large: 'text-lg px-8 py-3',
	};

	return (
		<button
			{...props}
			className={classNames(
				'rounded-md transition-all',
				colorVariants[variant],
				colorSizes[size],
				{ 'pointer-events-none opacity-75': props.disabled },
				props.className,
			)}
		>
			{props.children}
		</button>
	);
}
export default Button;
