import { useContext } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useWarehousesList from '../../../hooks/useWarehouseList';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import IconButton from '../../IconButton';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';
import WarehousesTable from '../../Warehouse/WarehousesTable';

function WarehousesListPage() {
	const appContext = useContext(CurrentAppContext);
	const { warehouses, isLoading, error } = useWarehousesList(appContext.organization.id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`List of the warehouses under ${appContext.organization.name}`}>
				<Link to="create">
					<IconButton icon={BsPlusCircle}>Create new warehouse</IconButton>
				</Link>
			</TableTopBar>
			<WarehousesTable warehouses={warehouses} />
		</Loader>
	);
}

export default WarehousesListPage;
