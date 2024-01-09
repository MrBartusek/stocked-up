import { useContext } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import IconButton from '../../IconButton';
import TableTopBar from '../../TableTopBar';
import InventoryListView from './InventoryListView';

function InventoryListPage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<>
			<TableTopBar header={`List of inventory in ${appContext.currentWarehouse.name}`}>
				<Link to="add">
					<IconButton icon={BsPlusCircle}>Add new inventory item</IconButton>
				</Link>
			</TableTopBar>
			<InventoryListView />
		</>
	);
}

export default InventoryListPage;
