import { useParams } from 'react-router-dom';
import useInventoryItemDetails from '../../../hooks/useInventoryItemDetails';
import GoBackButton from '../../GoBackButton';
import InventoryEntityInfo from '../../InventoryItem/InventoryEntityInfo';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';

function InventoryViewPage() {
	const { id } = useParams();

	const { inventoryItem, isLoading, error } = useInventoryItemDetails(id!);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are viewing inventory item for product: ${inventoryItem?.name}`}>
				<GoBackButton />
			</TableTopBar>
			<InventoryEntityInfo inventoryItem={inventoryItem} />
		</Loader>
	);
}

export default InventoryViewPage;