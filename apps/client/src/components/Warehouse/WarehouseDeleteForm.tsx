import { WarehouseDto } from 'shared-types';
import EntityDeleteDialog from '../Entity/EntityDeleteDialog';

export interface WarehouseDeleteFormProps {
	warehouse: WarehouseDto;
}

function WarehouseDeleteForm({ warehouse }: WarehouseDeleteFormProps) {
	return (
		<EntityDeleteDialog
			entityName={warehouse.name}
			entityId={warehouse.id}
			resourceName="warehouses"
			identifier="warehouse"
			deletedItems={['Inventory items in this warehouse']}
		/>
	);
}
export default WarehouseDeleteForm;
