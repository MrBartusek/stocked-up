import classNames from 'classnames';

type DIVProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface ContainerProps extends DIVProps {
	children?: React.ReactNode;
}

function Container({ children, ...props }: ContainerProps) {
	return (
		<div
			{...props}
			className={classNames(props.className, 'container mx-auto px-6')}
		>
			{children}
		</div>
	);
}
export default Container;
