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
					'mx-4 rounded-xl border border-gray-300 bg-light shadow-xl',
					'flex max-w-6xl flex-1',
					'px-12 py-10 md:px-24 md:py-20',
				)}
			>
				{children}
			</div>
		</div>
	);
}
export default FullFocusContainer;
