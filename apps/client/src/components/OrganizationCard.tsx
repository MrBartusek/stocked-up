import { BsBuilding } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import OrganizationSettingsButton from './OrganizationActions';
import WarehouseInfoRow from './WarehouseInfoRow';
import ExpandableList from './Helpers/ExpandableList';
import WarehousesList from './WarehousesList';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCard({ organization }: OrganizationCardProps) {
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
			<WarehousesList organization={organization} />
		</div>
	);
}
export default OrganizationCard;
