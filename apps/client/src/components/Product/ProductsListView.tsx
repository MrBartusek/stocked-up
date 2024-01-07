import { useContext, useState } from 'react';
import { PageQueryDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import useProductsList from '../../hooks/useProductsList';
import SortingOptions from '../../types/sortingOptions';
import SearchBar from '../Helpers/SearchBar';
import Loader from '../Loader';
import Pagination from '../Pagination';
import ProductsTable from './ProductsTable';

function ProductsListView() {
	const appContext = useContext(CurrentAppContext);

	const [query, setQuery] = useState<PageQueryDto>({ page: 1 });
	const { products, isLoading, error } = useProductsList(appContext.organization.id, query);

	function handleSearch(search: string) {
		setQuery({ ...query, search });
	}

	function handleSortingChange(options: SortingOptions) {
		setQuery({ ...query, ...options });
	}
	return (
		<Loader
			height="50vh"
			isLoading={isLoading}
			isError={error != undefined}
		>
			<SearchBar
				value={query.search}
				onSearch={handleSearch}
			/>
			<ProductsTable
				products={products!.data}
				query={query}
				handleSortingChange={handleSortingChange}
			/>
			<Pagination meta={products!.meta} />
		</Loader>
	);
}
export default ProductsListView;
