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
				props.className,
			)}
		>
			{children}
		</div>
	);
}
export default Alert;
