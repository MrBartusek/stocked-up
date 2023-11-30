import { Outlet } from 'react-router-dom';
import DashboardContainerCard from '../../DashboardContainerCard';
import DashboardContent from '../../DashboardContent';

function ProductsPage() {
	return (
		<DashboardContent header={'Products'}>
			<DashboardContainerCard>
				<Outlet />
			</DashboardContainerCard>
		</DashboardContent>
	);
}

export default ProductsPage;
