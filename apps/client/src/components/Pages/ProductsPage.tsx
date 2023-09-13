import Card from '../Card';
import DashboardContent from '../DashboardContent';
import ProductsTable from '../ProductsTable';

function ProductsPage() {
	return (
		<DashboardContent header={'Products'}>
			<Card>
				<ProductsTable />
			</Card>
		</DashboardContent>
	);
}

export default ProductsPage;
