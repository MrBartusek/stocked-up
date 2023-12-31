import classNames from 'classnames';

export interface FullFocusContainerProps {
	children?: React.ReactNode;
	className?: string;
}

function FullFocusContainer({ children, className }: FullFocusContainerProps) {
	return (
		<div className="flex h-full w-full items-center justify-center bg-gray-300">
			<div
				className={classNames(
					className,
					'mx-4 rounded-xl border border-gray-300 bg-light p-16 shadow-xl',
					'flex max-w-5xl flex-1',
				)}
			>
				{children}
			</div>
		</div>
	);
}
export default FullFocusContainer;
