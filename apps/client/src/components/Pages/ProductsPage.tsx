import ReactPlaceholder from 'react-placeholder';
import useProductsList from '../../hooks/useProductsList';
import Card from '../Card';
import DashboardContent from '../DashboardContent';
import ProductsTable from '../ProductsTable';
import Loader from '../Loader';

function ProductsPage() {
	const { products, isLoading } = useProductsList();

	return (
		<DashboardContent header={'Products'}>
			<Card>
				<Loader height="70vh" isLoading={isLoading}>
					<ProductsTable products={products} />
				</Loader>
			</Card>
		</DashboardContent>
	);
}

export default ProductsPage;
