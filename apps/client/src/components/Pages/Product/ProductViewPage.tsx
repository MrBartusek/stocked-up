import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useProductsDetails from '../../../hooks/useProductsDetails';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import Loader from '../../Loader';
import ProductEntityInfo from '../../ProductEntityInfo';
import TableTopBar from '../../TableTopBar';
import GoBackButton from '../../GoBackButton';

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
