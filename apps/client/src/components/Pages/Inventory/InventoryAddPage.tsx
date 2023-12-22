import { useContext } from 'react';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import GoBackButton from '../../GoBackButton';
import InventoryAddForm from '../../InventoryItem/InventoryAddForm';
import TableTopBar from '../../TableTopBar';

function InventoryAddPage() {
	const appContext = useContext(CurrentAppContext);

	return (
		<>
			<TableTopBar
				header={`You are creating new item inventory in ${appContext.currentWarehouse.name}`}
			>
				<GoBackButton />
			</TableTopBar>
			<InventoryAddForm />
		</>
	);
}

export default InventoryAddPage;
