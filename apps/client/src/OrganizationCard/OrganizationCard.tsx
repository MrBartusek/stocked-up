import {
	BsAirplane,
	BsBox,
	BsBoxSeam,
	BsBoxSeamFill,
	BsBoxes,
	BsBuilding,
	BsGlobeAmericas,
	BsHexagon,
	BsHexagonFill,
	BsTag,
	BsWallet,
} from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import Currency from '../components/Helpers/Currency';
import WarehousesList from '../components/Warehouse/WarehousesList';
import OrganizationSettingsButton from '../components/Organization/OrganizationActions';
import OrganizationStatsChip from '../components/Organization/OrganizationStatsChip';
import Card from '../components/Card';
import OrganizationCardHeader from './OrganizationCardHeader';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCard({ organization }: OrganizationCardProps) {
	return (
		<Card className="!p-0">
			<OrganizationCardHeader organization={organization} />
			<WarehousesList organization={organization} />
		</Card>
	);
}
export default OrganizationCard;
