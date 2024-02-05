import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';

function OrganizationOptionsTab() {
	const organization = useOutletContext<OrganizationDto>();

	return <div>{organization.name}</div>;
}
export default OrganizationOptionsTab;
