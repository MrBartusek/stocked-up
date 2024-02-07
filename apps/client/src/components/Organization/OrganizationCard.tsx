import { BsBoxes, BsBuilding, BsTag, BsWallet } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import { Utils } from '../../utils/utils';
import WarehousesList from '../Warehouse/WarehousesList';
import OrganizationSettingsButton from './OrganizationActions';
import OrganizationStatsChip from './OrganizationStatsChip';

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
						<OrganizationStatsChip icon={BsWallet}>
							{Utils.humanizeCurrency(organization.stats.totalValue)}
						</OrganizationStatsChip>
						<OrganizationStatsChip icon={BsTag}>
							{organization.stats.totalProducts}
						</OrganizationStatsChip>
						<OrganizationStatsChip icon={BsBoxes}>
							{organization.warehouses.length}
						</OrganizationStatsChip>
					</div>

					<OrganizationSettingsButton organization={organization} />
				</div>
			</div>
			<WarehousesList organization={organization} />
		</div>
	);
}
export default OrganizationCard;
