import { BsBoxSeam } from 'react-icons/bs';

export interface LoaderProps {
	height?: string;
	children: React.ReactNode;
	isLoading: boolean;
	isError?: boolean;
}

function Loader({ height = 'inherit', children, isLoading, isError }: LoaderProps) {
	if (isError) {
		return <div>failed</div>;
	} else if (isLoading) {
		return (
			<div
				style={{ height }}
				className="flex w-full items-center justify-center"
			>
				<BsBoxSeam className="animate-pulse text-5xl text-gray-600" />
			</div>
		);
	}
	return children;
}
export default Loader;
