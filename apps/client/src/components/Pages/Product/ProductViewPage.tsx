import { useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import ProductEntityInfo from '../../Product/ProductEntityInfo';
import TableTopBar from '../../TableTopBar';

function ProductViewPage() {
	const { id } = useParams();

	const { product, isLoading, error } = useProductsDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are viewing product: ${product?.name}`}>
				<GoBackButton />
			</TableTopBar>
			<ProductEntityInfo product={product} />
		</Loader>
	);
}

export default ProductViewPage;
