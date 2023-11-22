import { useContext } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import useInventoryList from '../../hooks/useInventoryList';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import IconButton from '../IconButton';
import InventoryTable from '../InventoryTable';
import Loader from '../Loader';
import TableTopBar from '../TableTopBar';

function InventoryListPage() {
	const appContext = useContext(CurrentAppContext);
	const { inventory, isLoading, error } = useInventoryList(appContext.currentWarehouse.id);

	return (
		<Loader
			height="70vh"
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`List of inventory in ${appContext.currentWarehouse.name}`}>
				<Link to="add">
					<IconButton icon={BsPlusCircle}>Add new inventory item</IconButton>
				</Link>
			</TableTopBar>
			<InventoryTable items={inventory} />
		</Loader>
	);
}

export default InventoryListPage;
