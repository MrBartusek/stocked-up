import { useParams } from 'react-router-dom';
import useInventoryItemDetails from '../../../hooks/useInventoryItemDetails';
import GoBackButton from '../../GoBackButton';
import InventoryItemUpdateForm from '../../InventoryItem/InventoryItemUpdateForm';
import Loader from '../../Loader';
import TableTopBar from '../../TableTopBar';

function InventoryUpdatePage() {
	const { id } = useParams();
	const { inventoryItem, isLoading, error } = useInventoryItemDetails(id);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			<TableTopBar header={`You are updating inventory item: ${inventoryItem?.name}`}>
				<GoBackButton to={`../view/${inventoryItem?.id}`} />
			</TableTopBar>
			<InventoryItemUpdateForm inventoryItem={inventoryItem!} />
		</Loader>
	);
}

export default InventoryUpdatePage;
