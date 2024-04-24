import classNames from 'classnames';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type AlertVariant = 'danger' | 'success' | 'info' | 'warning';

export interface AlertProps extends DivProps {
	children?: React.ReactNode;
	variant?: AlertVariant;
}

function Alert({ children, variant = 'danger', ...props }: AlertProps) {
	const colorVariants: { [key in AlertVariant]: string } = {
		danger: 'border-red-300 bg-red-200',
		success: 'border-green-300 bg-green-200',
		info: 'border-sky-300 bg-sky-100',
		warning: 'border-amber-400 bg-amber-100',
	};

	return (
		<div
			{...props}
			className={classNames(
				props.className,
				'mb-4 overflow-hidden break-words rounded-sm border p-4',
				'flex items-center gap-4',
				colorVariants[variant],
			)}
		>
			{children}
		</div>
	);
}
export default Alert;
