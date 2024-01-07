import { useParams } from 'react-router-dom';
import useInventoryItemDetails from '../../../hooks/useInventoryItemDetails';
import InventoryEntityInfo from '../../InventoryItem/InventoryEntityInfo';
import Loader from '../../Loader';

function InventoryViewPage() {
	const { id } = useParams();

	const { inventoryItem, isLoading, error } = useInventoryItemDetails(id!);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<InventoryEntityInfo inventoryItem={inventoryItem!} />
		</Loader>
	);
}

export default InventoryViewPage;
