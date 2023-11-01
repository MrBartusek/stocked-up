import classNames from 'classnames';

type HTMLButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface ButtonProps extends HTMLButtonProps {
	loading?: boolean;
}

function Button({ loading, ...props }: ButtonProps) {
	if (loading) {
		props.disabled = true;
	}
	return (
		<button
			className={classNames(
				'rounded-md bg-primary px-3.5 py-2.5 text-light',
				'transition-opacity',
				loading ? 'pointer-events-none opacity-75' : 'cursor-pointer hover:bg-primary-hover',
				props.className,
			)}
		>
			{props.children}
		</button>
	);
}
export default Button;
