import { useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import ProductUpdateForm from '../../Product/ProductUpdateForm';
import TableTopBar from '../../TableTopBar';

function ProductUpdatePage() {
	const { id } = useParams();
	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are updating product: ${product?.name}`}>
				<GoBackButton to={`../view/${product?.id}`} />
			</TableTopBar>
			<ProductUpdateForm product={product!} />
		</Loader>
	);
}

export default ProductUpdatePage;
