import classNames from 'classnames';

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface PageButtonProps extends ButtonProps {
	children?: React.ReactNode;
	active?: boolean;
}

function PageButton({ children, active, ...props }: PageButtonProps) {
	return (
		<button
			{...props}
			className={classNames(
				'flex h-9 min-w-[2.25rem] items-center justify-center px-1 transition-colors',
				active ? 'bg-accent text-primary' : 'bg-gray-50 hover:bg-gray-100',
				{
					'pointer-events-none': active || props.disabled,
				},
				'disabled:text-gray-300 ',
			)}
		>
			{children}
		</button>
	);
}
export default PageButton;
