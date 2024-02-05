import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';

function OrganizationMembersTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">Organization Members</h2>
			<p className="mb-4 text-muted">
				Organization members are all StockedUp users with access to specific organization.
			</p>

			<div>[ MISSING ACL PANEL ]</div>
		</div>
	);
}
export default OrganizationMembersTab;
