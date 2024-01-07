import { useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import Loader from '../../Loader';
import ProductDeleteForm from '../../Product/ProductDeleteForm';

function ProductDeletePage() {
	const { id } = useParams();
	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<ProductDeleteForm product={product!} />
		</Loader>
	);
}

export default ProductDeletePage;
