import { useParams } from 'react-router-dom';
import useInventoryItemDetails from '../../../hooks/useInventoryItemDetails';
import InventoryItemDeleteForm from '../../InventoryItem/InventoryItemDeleteForm';
import Loader from '../../Loader';

function InventoryDeletePage() {
	const { id } = useParams();
	const { inventoryItem, isLoading, error } = useInventoryItemDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<InventoryItemDeleteForm item={inventoryItem!} />
		</Loader>
	);
}

export default InventoryDeletePage;
