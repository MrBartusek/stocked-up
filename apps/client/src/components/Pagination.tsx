import { PageMeta } from 'shared-types';
import ItemsPerPageSelect from './ItemsPerPageSelect';
import PageSelector from './PageSelector/PageSelector';

export interface PaginationProps {
	meta: PageMeta;
	handlePageSizeChange?: (value: number) => void;
	handlePageChange?: (value: number) => void;
}

function Pagination({ meta, handlePageSizeChange, handlePageChange }: PaginationProps) {
	return (
		<div className="flex justify-between pt-4">
			<div className="flex items-center gap-3">
				<span>Items per page:</span>
				<ItemsPerPageSelect
					value={meta.pageLength}
					onChange={handlePageSizeChange}
				/>
			</div>
			<div className="flex items-center">
				<PageSelector
					meta={meta}
					handlePageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}
export default Pagination;
