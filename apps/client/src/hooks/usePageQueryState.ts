import { useState } from 'react';
import { IPageQueryDto } from 'shared-types';
import SortingOptions from '../types/sortingOptions';

/**
 * This hook is a wrapper over PageQueryDto state with additional common set function
 * used by component such as: SearchBar, Pagination and entity tables
 */
function usePageQueryState<T = any>(baseQuery?: IPageQueryDto<T>) {
	const [query, setQuery] = useState<IPageQueryDto<T>>({ page: 1, pageSize: 10, ...baseQuery });

	function handleSearch(search: string) {
		setQuery((q) => ({ ...q, search, page: 1 }));
	}

	function handleSortingChange(options: SortingOptions<T>) {
		setQuery((q) => ({ ...q, ...options }));
	}

	function handlePageChange(page: number) {
		setQuery((q) => ({ ...q, page: page }));
	}

	function handlePageSizeChange(pageSize: number) {
		setQuery((q) => ({ ...q, pageSize, page: 1 }));
	}

	return {
		query,
		setQuery,
		handleSearch,
		handleSortingChange,
		handlePageChange,
		handlePageSizeChange,
	};
}

export default usePageQueryState;
