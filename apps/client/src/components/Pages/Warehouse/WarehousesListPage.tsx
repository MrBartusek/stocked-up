import { useContext } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import IconButton from '../../IconButton';
import TableTopBar from '../../TableTopBar';
import WarehousesListView from './WarehousesListView.';

function WarehousesListPage() {
	const appContext = useContext(CurrentAppContext);
	return (
		<>
			<TableTopBar header={`List of the warehouses under ${appContext.organization.name}`}>
				<Link to="create">
					<IconButton icon={BsPlusCircle}>Create new warehouse</IconButton>
				</Link>
			</TableTopBar>
			<WarehousesListView />
		</>
	);
}

export default WarehousesListPage;
