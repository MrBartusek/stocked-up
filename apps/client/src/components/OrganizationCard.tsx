import { BsBuilding } from 'react-icons/bs';
import WarehouseInfoRow from './WarehouseInfoRow';
import { OrganizationDto } from 'shared-types';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCard({ organization }: OrganizationCardProps) {
	return (
		<div className="mt-12 rounded-xl border border-gray-200 bg-gray-150 p-6">
			<div className="mb-8 flex items-center gap-4 text-xl">
				<div className="rounded-full bg-gray-300 p-4">
					<BsBuilding />
				</div>
				<h3>{organization.name}</h3>
			</div>
			<div>
				{organization.warehouses.map((warehouse, i) => (
					<WarehouseInfoRow
						warehouse={warehouse}
						key={i}
					/>
				))}
			</div>
		</div>
	);
}
export default OrganizationCard;
