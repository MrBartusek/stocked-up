import { useContext } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import IconButton from '../IconButton';
import ProductCreateForm from '../ProductCreateForm';
import TableTopBar from '../TableTopBar';

function ProductsCreatePage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<div>
			<TableTopBar
				header={`You are creating new product definition in ${appContext.organization.name}`}
			>
				<Link to="..">
					<IconButton icon={BsChevronLeft}>Go back</IconButton>
				</Link>
			</TableTopBar>
			<ProductCreateForm />
		</div>
	);
}

export default ProductsCreatePage;
