import { BsBuilding } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import WarehouseInfoRow from './WarehouseInfoRow';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCard({ organization }: OrganizationCardProps) {
	return (
		<div className="mt-12">
			<div className="flex items-center gap-4 border-b border-gray-300 px-8 py-4 text-xl">
				<BsBuilding />
				<h3>{organization.name}</h3>
			</div>
			<div className="my-4">
				{organization.warehouses.map((warehouse, i) => (
					<WarehouseInfoRow
						organizationId={organization.id}
						warehouse={warehouse}
						key={i}
					/>
				))}
			</div>
		</div>
	);
}
export default OrganizationCard;
