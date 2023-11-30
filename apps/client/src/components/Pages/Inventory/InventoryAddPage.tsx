import { useContext } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CurrentAppContext } from '../../Context/CurrentAppContext';
import IconButton from '../../IconButton';
import TableTopBar from '../../TableTopBar';
import InventoryAddForm from '../../InventoryAddForm';

function InventoryAddPage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<>
			<TableTopBar
				header={`You are creating new item inventory in ${appContext.currentWarehouse.name}`}
			>
				<Link to="..">
					<IconButton icon={BsChevronLeft}>Go back</IconButton>
				</Link>
			</TableTopBar>
			<InventoryAddForm />
		</>
	);
}

export default InventoryAddPage;
