import useProductsList from '../../hooks/useProductsList';
import DashboardContainerCard from '../DashboardContainerCard';
import DashboardContent from '../DashboardContent';
import Loader from '../Loader';
import ProductsTable from '../ProductsTable';

function ProductsPage() {
	const { products, isLoading } = useProductsList();

	return (
		<DashboardContent header={'Products'}>
			<DashboardContainerCard>
				<Loader
					height="70vh"
					isLoading={isLoading}
				>
					<ProductsTable products={products} />
				</Loader>
			</DashboardContainerCard>
		</DashboardContent>
	);
}

export default ProductsPage;
