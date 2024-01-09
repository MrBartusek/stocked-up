import Button from './Button';

export interface LoadMoreButtonProps {
	fetchNextPage: () => Promise<any>;
	hasNextPage?: boolean;
	isFetchingNextPage?: boolean;
}

function LoadMoreButton({ fetchNextPage, hasNextPage, isFetchingNextPage }: LoadMoreButtonProps) {
	return (
		<div className="mt-8 flex justify-center">
			<Button
				variant="primary-outline"
				onClick={() => fetchNextPage()}
				disabled={!hasNextPage}
				loading={isFetchingNextPage}
			>
				Load More
			</Button>
		</div>
	);
}
export default LoadMoreButton;
