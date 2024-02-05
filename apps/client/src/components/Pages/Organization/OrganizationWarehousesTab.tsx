import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';

function OrganizationWarehousesTab() {
	const organization = useOutletContext<OrganizationDto>();

	return <div>{organization.name}</div>;
}
export default OrganizationWarehousesTab;
