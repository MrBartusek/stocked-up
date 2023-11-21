import { BsBuilding } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import OrganizationSettingsButton from './OrganizationActions';
import WarehouseInfoRow from './WarehouseInfoRow';
import ExpandableList from './Helpers/ExpandableList';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCard({ organization }: OrganizationCardProps) {
	const warehouseElements = organization.warehouses.map((warehouse, i) => (
		<WarehouseInfoRow
			organizationId={organization.id}
			warehouse={warehouse}
			key={i}
		/>
	));

	const needExpander = warehouseElements.length > 3;

	return (
		<div className="mt-12">
			<div className="flex justify-between border-b border-gray-300 px-8 py-4">
				<span className="flex items-center gap-4 text-xl">
					<BsBuilding />
					<h3>{organization.name}</h3>
				</span>
				<span>
					<OrganizationSettingsButton organization={organization} />
				</span>
			</div>
			<div className="my-4">
				{warehouseElements.slice(0, needExpander ? 3 : 4)}
				{needExpander && <ExpandableList>{warehouseElements.slice(3)}</ExpandableList>}
			</div>
		</div>
	);
}
export default OrganizationCard;
