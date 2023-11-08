import classNames from 'classnames';
import { BsBoxSeam } from 'react-icons/bs';

export interface LoaderProps {
	height?: string;
	children: React.ReactNode;
	isLoading: boolean;
	isError?: boolean;
}

function Loader({ height = 'inherit', children, isLoading, isError }: LoaderProps) {
	if (isLoading || isError) {
		return (
			<div
				style={{ height }}
				className="flex w-full flex-col items-center justify-center gap-3 py-16"
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
	return children;
}
export default Loader;
