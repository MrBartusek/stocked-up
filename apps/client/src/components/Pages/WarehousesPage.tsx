import { useContext } from 'react';
import useWarehousesList from '../../hooks/useWarehouseList';
import Card from '../Card';
import DashboardContent from '../DashboardContent';
import Loader from '../Loader';
import WarehousesTable from '../WarehousesTable';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import TableTopBar from '../TableTopBar';
import { BsPlusCircle } from 'react-icons/bs';
import Button from '../Button';

function WarehousesPage() {
	const appContext = useContext(CurrentAppContext);
	const { warehouses, isLoading, error } = useWarehousesList(appContext.organization.id);

	return (
		<DashboardContent header={'Warehouses'}>
			<Card>
				<Loader
					isLoading={isLoading}
					isError={error != undefined}
				>
					<TableTopBar header={`List of the warehouses under ${appContext.organization.name}`}>
						<Button className="flex items-center gap-3">
							<BsPlusCircle size={20} />
							Create new warehouse
						</Button>
					</TableTopBar>
					<WarehousesTable warehouses={warehouses} />
				</Loader>
			</Card>
		</DashboardContent>
	);
}

export default WarehousesPage;
