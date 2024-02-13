import classNames from 'classnames';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface AlertProps extends DivProps {
	children: React.ReactNode;
}

function Alert({ children, ...props }: AlertProps) {
	return (
		<div
			{...props}
			className={classNames(
				'overflow-hidden break-words rounded-sm border border-red-300 bg-red-200 p-4',
				'flex items-center gap-2',
				props.className,
			)}
		>
			{children}
		</div>
	);
}
export default Alert;
