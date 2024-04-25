import { OrganizationDto } from 'shared-types';
import Card from '../Card';
import WarehousesList from '../Warehouse/WarehousesList';
import OrganizationCardHeader from './OrganizationCardHeader';

export interface OrganizationCardProps {
	organization: OrganizationDto;
}

function OrganizationCard({ organization }: OrganizationCardProps) {
	return (
		<Card className="pb--4 !px-0 !pt-0 pb-12">
			<OrganizationCardHeader organization={organization} />
			<WarehousesList organization={organization} />
		</Card>
	);
}
export default OrganizationCard;
