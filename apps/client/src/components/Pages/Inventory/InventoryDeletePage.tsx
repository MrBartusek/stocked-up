import { useParams } from 'react-router-dom';
import useWarehouseDetails from '../../../hooks/useWarehouseDetails';
import GoBackButton from '../../GoBackButton';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';
import WarehouseDeleteForm from '../../Warehouse/WarehouseDeleteForm';
import InventoryItemDeleteForm from '../../InventoryItem/InventoryItemDeleteForm';
import useInventoryItemDetails from '../../../hooks/useInventoryItemDetails';

function InventoryDeletePage() {
	const { id } = useParams();
	const { inventoryItem, isLoading, error } = useInventoryItemDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<InventoryItemDeleteForm item={inventoryItem} />
		</Loader>
	);
}

export default InventoryDeletePage;
