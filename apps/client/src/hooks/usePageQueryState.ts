import { useState } from 'react';
import { PageQueryDto } from 'shared-types';
import SortingOptions from '../types/sortingOptions';

/**
 * This hook is a wrapper over PageQueryDto state with additional common set function
 * used by component such as: SearchBar, Pagination and entity tables
 */
function usePageQueryState() {
	const [query, setQuery] = useState<PageQueryDto>({ page: 1 });

	function handleSearch(search: string) {
		setQuery({ ...query, search });
	}

	function handleSortingChange(options: SortingOptions) {
		setQuery({ ...query, ...options });
	}

	return { query, setQuery, handleSearch, handleSortingChange };
}

export default usePageQueryState;
