import classNames from 'classnames';

type HTMLButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface ButtonProps extends HTMLButtonProps {}

function Button({ ...props }: ButtonProps) {
	return (
		<button
			className={classNames(
				'hover:bg-primary-hover text-light cursor-pointer rounded-md bg-primary px-3.5 py-2.5',
				props.className,
			)}
		>
			{props.children}
		</button>
	);
}
export default Button;
