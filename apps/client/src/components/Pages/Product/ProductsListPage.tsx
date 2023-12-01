import { useContext } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useProductsList from '../../../hooks/useProductsList';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import IconButton from '../../IconButton';
import Loader from '../../Loader';
import ProductsTable from '../../Product/ProductsTable';
import TableTopBar from '../../TableTopBar';

function ProductsListPage() {
	const appContext = useContext(CurrentAppContext);
	const { products, isLoading, error } = useProductsList(appContext.organization.id);

	return (
		<Loader
			height="70vh"
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`List of the products used in ${appContext.organization.name}`}>
				<Link to="create">
					<IconButton icon={BsPlusCircle}>Create new product</IconButton>
				</Link>
			</TableTopBar>
			<ProductsTable products={products} />
		</Loader>
	);
}

export default ProductsListPage;
