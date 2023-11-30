import { Outlet } from 'react-router-dom';
import DashboardContainerCard from '../../DashboardContainerCard';
import DashboardContent from '../../DashboardContent';

function WarehousesPage() {
	return (
		<DashboardContent header={'Warehouses'}>
			<DashboardContainerCard>
				<Outlet />
			</DashboardContainerCard>
		</DashboardContent>
	);
}

export default WarehousesPage;
