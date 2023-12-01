import { BsChevronLeft } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import IconButton from '../../IconButton';
import Loader from '../../Loader';
import ProductEditForm from '../../ProductUpdateForm';
import TableTopBar from '../../TableTopBar';
import GoBackButton from '../../GoBackButton';

function ProductEditPage() {
	const { id } = useParams();
	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are editing product: ${product?.name}`}>
				<GoBackButton to={`../view/${product.id}`} />
			</TableTopBar>
			<ProductEditForm product={product} />
		</Loader>
	);
}

export default ProductEditPage;
