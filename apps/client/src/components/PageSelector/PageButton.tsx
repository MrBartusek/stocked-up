import classNames from 'classnames';

export interface PageButtonProps {
	children?: React.ReactNode;
	active?: boolean;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
}

function PageButton({ children, active, onClick, disabled }: PageButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={classNames(
				'flex h-9 min-w-[2.25rem] items-center justify-center px-1 transition-colors',
				active ? 'bg-accent text-primary' : 'bg-gray-50 hover:bg-gray-100',
				{
					'pointer-events-none': active || disabled,
				},
				'disabled:text-gray-300 ',
			)}
		>
			{children}
		</button>
	);
}
export default PageButton;
