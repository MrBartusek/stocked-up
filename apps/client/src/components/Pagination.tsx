import { PageMeta } from 'shared-types';

export interface PaginationProps {
	meta: PageMeta;
}

function Pagination({ meta }: PaginationProps) {
	return (
		<div className="pt-4 text-center">
			page: {meta.page} len: {meta.pageLength}
		</div>
	);
}
export default Pagination;
