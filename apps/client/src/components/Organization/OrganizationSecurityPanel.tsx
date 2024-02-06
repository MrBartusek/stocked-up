import { OrganizationDto } from 'shared-types';

export interface OrganizationSecurityPanelProps {
	organization: OrganizationDto;
}

function OrganizationSecurityPanel({ organization }: OrganizationSecurityPanelProps) {
	return <div>OrganizationSecurityPanel</div>;
}
export default OrganizationSecurityPanel;
