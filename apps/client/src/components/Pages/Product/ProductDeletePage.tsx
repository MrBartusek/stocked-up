import { useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import ProductUpdateForm from '../../Product/ProductUpdateForm';
import TableTopBar from '../../TableTopBar';
import ProductDeleteForm from '../../Product/ProductDeleteForm';

function ProductDeletePage() {
	const { id } = useParams();
	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are about to delete product: ${product?.name}`}>
				<GoBackButton to={`../view/${product?.id}`} />
			</TableTopBar>
			<ProductDeleteForm product={product} />
		</Loader>
	);
}

export default ProductDeletePage;
