import classNames from 'classnames';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type AlertVariant = 'danger' | 'success';

export interface AlertProps extends DivProps {
	children: React.ReactNode;
	variant?: AlertVariant;
}

function Alert({ children, variant = 'danger', ...props }: AlertProps) {
	const colorVariants: { [key in AlertVariant]: string } = {
		danger: 'border-red-300 bg-red-200',
		success: 'border-green-300 bg-green-200',
	};

	return (
		<div
			{...props}
			className={classNames(
				'overflow-hidden break-words rounded-sm border  p-4',
				'flex items-center gap-2',
				colorVariants[variant],
				props.className,
			)}
		>
			{children}
		</div>
	);
}
export default Alert;
