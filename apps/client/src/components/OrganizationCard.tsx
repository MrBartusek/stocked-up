import { BsBoxes, BsBuilding, BsTag } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import OrganizationSettingsButton from './OrganizationActions';
import WarehouseInfoRow from './WarehouseInfoRow';
import ExpandableList from './Helpers/ExpandableList';
import WarehousesList from './WarehousesList';
import { Utils } from '../utils';

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
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-3">
						<div className="flex items-center gap-1 text-muted">
							<BsTag />
							<span>{organization.stats.totalProducts}</span>
						</div>
						<div className="flex items-center gap-1 text-muted">
							<BsBoxes />
							<span>{organization.warehouses.length}</span>
						</div>
					</div>

					<OrganizationSettingsButton organization={organization} />
				</div>
			</div>
			<WarehousesList organization={organization} />
		</div>
	);
}
export default OrganizationCard;
