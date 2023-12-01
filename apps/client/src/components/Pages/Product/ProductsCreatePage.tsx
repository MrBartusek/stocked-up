import { useContext } from 'react';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import GoBackButton from '../../GoBackButton';
import ProductCreateForm from '../../ProductCreateForm';
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
