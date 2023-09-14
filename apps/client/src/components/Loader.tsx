import { BsBox, BsBox2, BsBoxSeam, BsBoxes } from 'react-icons/bs';

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
			<div style={{ height }} className="w-full flex justify-center items-center">
				<BsBoxSeam className="text-gray-600 text-5xl animate-pulse" />
			</div>
		);
	}
	return children;
}
export default Loader;
