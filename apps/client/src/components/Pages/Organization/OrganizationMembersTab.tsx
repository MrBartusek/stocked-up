import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';

function OrganizationMembersTab() {
	const organization = useOutletContext<OrganizationDto>();

	return <div>{organization.name}</div>;
}
export default OrganizationMembersTab;
