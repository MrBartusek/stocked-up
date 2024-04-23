import { OrganizationDto } from 'shared-types';
import ExpandableList from '../Helpers/ExpandableList';
import WarehouseInfoRow from './WarehouseInfoRow';

export interface WarehousesListProps {
	organization: OrganizationDto;
	disableExpander?: boolean;
}

function WarehousesList({ organization, disableExpander }: WarehousesListProps) {
	const warehouseElements = organization.warehouses.map((warehouse, i) => (
		<WarehouseInfoRow
			organizationId={organization.id}
			warehouse={warehouse}
			key={i}
		/>
	));

	const needExpander = warehouseElements.length > 3;

	return (
		<div className="mx-4 my-2">
			{disableExpander ? warehouseElements : warehouseElements.slice(0, needExpander ? 3 : 4)}
			{needExpander && !disableExpander && (
				<ExpandableList>{warehouseElements.slice(3)}</ExpandableList>
			)}
		</div>
	);
}
export default WarehousesList;
