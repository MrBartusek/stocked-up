import { useContext } from 'react';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import GoBackButton from '../../GoBackButton';
import ProductCreateForm from '../../Product/ProductCreateForm';
import TableTopBar from '../../TableTopBar';

function ProductsCreatePage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<div>
			<TableTopBar
				header={`You are creating new product definition in ${appContext.organization.name}`}
			>
				<GoBackButton />
			</TableTopBar>
			<ProductCreateForm />
		</div>
	);
}

export default ProductsCreatePage;
