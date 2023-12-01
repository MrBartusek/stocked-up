import { useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import ProductEditForm from '../../Product/ProductUpdateForm';
import TableTopBar from '../../TableTopBar';

function ProductEditPage() {
	const { id } = useParams();
	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are editing product: ${product?.name}`}>
				<GoBackButton to={`../view/${product?.id}`} />
			</TableTopBar>
			<ProductEditForm product={product} />
		</Loader>
	);
}

export default ProductEditPage;
