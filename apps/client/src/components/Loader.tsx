import classNames from 'classnames';
import { ErrorBoundary } from 'react-error-boundary';
import { BsBoxSeam } from 'react-icons/bs';

export interface LoaderProps {
	height?: string;
	children?: React.ReactNode;
	className?: string;
	isLoading: boolean;
	isError?: boolean;
}

function Loader({ height = 'inherit', children, isLoading, isError, className }: LoaderProps) {
	if (isLoading || isError) {
		return (
			<div
				style={{ height }}
				className={classNames(
					'flex w-full flex-col items-center justify-center gap-3 py-12',
					className,
				)}
			>
				<BsBoxSeam
					className={classNames(
						'text-5xl',
						isError ? 'text-red-600' : 'animate-pulse text-gray-600 ',
					)}
				/>
				{isError ? <span className="font-bold text-red-600">Loading Failed</span> : null}
			</div>
		);
	}
	return (
		<ErrorBoundary
			fallback={
				<span className="font-bold text-red-600">
					StockedUp encountered and error when loading this element
				</span>
			}
		>
			{children}
		</ErrorBoundary>
	);
}
export default Loader;
