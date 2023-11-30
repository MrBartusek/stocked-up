import { Outlet } from 'react-router-dom';
import Card from '../../Card';
import DashboardContent from '../../DashboardContent';

function InventoryManagementPage() {
	return (
		<DashboardContent header={'Inventory Management'}>
			<Card>
				<Outlet />
			</Card>
		</DashboardContent>
	);
}

export default InventoryManagementPage;
