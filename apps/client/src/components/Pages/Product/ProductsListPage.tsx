import { useContext } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import IconButton from '../../IconButton';
import ProductsListView from '../../Product/ProductsListView';
import TableTopBar from '../../TableTopBar';

function ProductsListPage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<>
			<TableTopBar header={`List of the products used in ${appContext.organization.name}`}>
				<Link to="create">
					<IconButton icon={BsPlusCircle}>Create new product</IconButton>
				</Link>
			</TableTopBar>
			<ProductsListView />
		</>
	);
}

export default ProductsListPage;
