import { useContext, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { WarehouseDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import { Utils } from '../../utils/utils';
import EntityDeleteDialog from '../Entity/EntityDeleteDialog';

export interface WarehouseDeleteFormProps {
	warehouse: WarehouseDto;
}

function WarehouseDeleteForm({ warehouse }: WarehouseDeleteFormProps) {
	const appContext = useContext(CurrentAppContext);
	const queryClient = useQueryClient();

	const navigateTo = useMemo(() => {
		// Navigate to any other warehouse when current one
		// has been deleted
		if (warehouse.id == appContext.currentWarehouse.id) {
			const otherWarehouse = appContext.organization.warehouses.find((w) => w.id != warehouse.id);
			const dashboardUrl = Utils.dashboardUrl(appContext.organization.id, otherWarehouse?.id);
			return dashboardUrl + '/warehouses';
		}
		return '..';
	}, [warehouse, appContext]);

	async function invalidateOrganization() {
		await queryClient.invalidateQueries(['organizations', appContext.organization.id]);
	}

	return (
		<EntityDeleteDialog
			entityName={warehouse.name}
			entityId={warehouse.id}
			navigateTo={navigateTo}
			onDelete={invalidateOrganization}
			resourceName="warehouses"
			identifier="warehouse"
			deletedItems={['Inventory items in this warehouse']}
		/>
	);
}
export default WarehouseDeleteForm;
