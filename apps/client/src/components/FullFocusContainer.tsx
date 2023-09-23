import classNames from 'classnames';

export interface FullFocusContainerProps {
	children?: React.ReactNode;
	className?: string;
}

function FullFocusContainer({ children, className }: FullFocusContainerProps) {
	return (
		<div className="full-focus-background flex h-full w-full items-center justify-center bg-gray-900">
			<div className={classNames(className, 'bg-light rounded-xl border border-gray-300 p-16')}>
				{children}
			</div>
		</div>
	);
}
export default FullFocusContainer;
