import { OrganizationDto } from 'shared-types';
import WarehouseInfoRow from './WarehouseInfoRow';
import ExpandableList from './Helpers/ExpandableList';

export interface WarehousesListProps {
	organization: OrganizationDto;
}

function WarehousesList({ organization }: WarehousesListProps) {
	const warehouseElements = organization.warehouses.map((warehouse, i) => (
		<WarehouseInfoRow
			organizationId={organization.id}
			warehouse={warehouse}
			key={i}
		/>
	));

	const needExpander = warehouseElements.length > 3;

	return (
		<div className="my-4">
			{warehouseElements.slice(0, needExpander ? 3 : 4)}
			{needExpander && <ExpandableList>{warehouseElements.slice(3)}</ExpandableList>}
		</div>
	);
}
export default WarehousesList;
