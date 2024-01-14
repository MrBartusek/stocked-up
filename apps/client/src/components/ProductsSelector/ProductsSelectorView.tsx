import { useContext } from 'react';
import { BasicProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import usePageQueryState from '../../hooks/usePageQueryState';
import useProductsList from '../../hooks/useProductsList';
import SearchBar from '../Helpers/SearchBar';
import Loader from '../Loader';
import Pagination from '../Pagination';
import ProductsSelectorTable from './ProductsTableSelector';

export interface ProductsSelectorViewProps {
	onClickRow?: (product: BasicProductDto) => void;
}

function ProductsSelectorView({ onClickRow }: ProductsSelectorViewProps) {
	const appContext = useContext(CurrentAppContext);
	const { query, handleSearch, handlePageChange, handlePageSizeChange } = usePageQueryState({
		pageSize: 5,
	});
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
					<ProductsSelectorTable
						onClickRow={onClickRow}
						products={products.items}
						query={query}
					/>
					<Pagination
						meta={products.meta}
						disablePageSelector
						handlePageChange={handlePageChange}
						handlePageSizeChange={handlePageSizeChange}
					/>
				</>
			)}
		</Loader>
	);
}
export default ProductsSelectorView;
