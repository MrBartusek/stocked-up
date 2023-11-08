import useWarehousesList from '../../hooks/useOrganisationData';
import Card from '../Card';
import DashboardContent from '../DashboardContent';
import Loader from '../Loader';
import WarehousesTable from '../WarehousesTable';

function WarehousesPage() {
	// bad hook, only for simple list
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
