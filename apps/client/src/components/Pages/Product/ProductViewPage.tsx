import { useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import Loader from '../../Loader';
import ProductEntityInfo from '../../Product/ProductEntityInfo';

function ProductViewPage() {
	const { id } = useParams();

	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<ProductEntityInfo product={product!} />
		</Loader>
	);
}

export default ProductViewPage;
