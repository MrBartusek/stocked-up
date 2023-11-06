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
				className="my-16 flex w-full flex-col items-center justify-center gap-3"
			>
				<BsBoxSeam
					className={classNames(
						'text-5xl',
						isError ? 'text-red-600' : 'animate-pulse text-gray-600 ',
					)}
				/>
				{isError ? <span>Loading of this resource failed</span> : null}
			</div>
		);
	}
	return children;
}
export default Loader;
