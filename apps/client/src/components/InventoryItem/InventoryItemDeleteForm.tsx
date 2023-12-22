import { InventoryItemDto } from 'shared-types';
import EntityDeleteDialog from '../Entity/EntityDeleteDialog';

export interface InventoryItemDeleteFormProps {
	item: InventoryItemDto;
}

function InventoryItemDeleteForm({ item }: InventoryItemDeleteFormProps) {
	return (
		<EntityDeleteDialog
			entityName={item.name}
			entityId={item.id}
			image={item.image}
			resourceName="inventory"
			identifier="inventory item"
		/>
	);
}
export default InventoryItemDeleteForm;
