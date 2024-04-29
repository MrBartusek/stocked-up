import { BsBoxes, BsGlobeAmericas, BsTag, BsWallet } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import Currency from '../Helpers/Currency';
import OrganizationSettingsButton from '../Organization/OrganizationActions';
import OrganizationStatsChip from '../Organization/OrganizationStatsChip';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCardHeader({ organization }: OrganizationCardProps) {
	return (
		<div className="flex justify-between rounded-t-md border-b bg-gray-100 px-8 py-5">
			<span className="flex items-center gap-4 text-xl">
				<div className="text-primary">
					<BsGlobeAmericas />
				</div>

				<h3>{organization.name}</h3>
			</span>
			<div className="flex items-center gap-4">
				<div className="hidden items-center gap-3 md:flex">
					<OrganizationStatsChip icon={BsWallet}>
						<Currency suffix={organization.settings.currency}>
							{organization.stats.totalValue}
						</Currency>
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
	);
}
export default OrganizationCardHeader;
