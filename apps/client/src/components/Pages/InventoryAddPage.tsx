import { Link } from 'react-router-dom';
import TableTopBar from '../TableTopBar';
import IconButton from '../IconButton';
import { BsChevronLeft } from 'react-icons/bs';
import { useContext } from 'react';
import { CurrentAppContext } from '../Context/CurrentAppContext';
import InventoryAddForm from '../InventoryAddForm';

function InventoryAddPage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<>
			<TableTopBar
				header={`You are creating new inventory item definition in ${appContext.currentWarehouse.name}`}
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
