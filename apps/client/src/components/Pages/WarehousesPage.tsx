import useWarehousesList from '../../hooks/useWarehousesList';
import Card from '../Card';
import DashboardContent from '../DashboardContent';
import Loader from '../Loader';
import WarehousesTable from '../WarehousesTable';

function WarehousesPage() {
	const { warehouses, isLoading } = useWarehousesList();

	return (
		<DashboardContent header={'Warehouses'}>
			<Card>
				<Loader
					height="70vh"
					isLoading={isLoading}
				>
					<WarehousesTable warehouses={warehouses} />
				</Loader>
			</Card>
		</DashboardContent>
	);
}

export default WarehousesPage;
