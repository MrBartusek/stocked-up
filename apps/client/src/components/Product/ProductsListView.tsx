import { useContext } from 'react';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import usePageQueryState from '../../hooks/usePageQueryState';
import useProductsList from '../../hooks/useProductsList';
import SearchBar from '../Helpers/SearchBar';
import Loader from '../Loader';
import Pagination from '../Pagination';
import ProductsTable from './ProductsTable';

function ProductsListView() {
	const appContext = useContext(CurrentAppContext);
	const { query, handleSearch, handleSortingChange, handlePageChange, handlePageSizeChange } =
		usePageQueryState();
	const { products, isLoading, error } = useProductsList(appContext.organization.id, query);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			{products && (
				<>
					<SearchBar
						value={query.search}
						onSearch={handleSearch}
						placeholder="Search for products"
					/>
					<ProductsTable
						products={products.items}
						query={query}
						handleSortingChange={handleSortingChange}
					/>
					<Pagination
						meta={products.meta}
						handlePageChange={handlePageChange}
						handlePageSizeChange={handlePageSizeChange}
					/>
				</>
			)}
		</Loader>
	);
}
export default ProductsListView;
