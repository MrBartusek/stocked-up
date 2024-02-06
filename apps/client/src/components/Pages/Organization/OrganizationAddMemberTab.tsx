import { useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';

function OrganizationAddMemberTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">Add Organization Member</h2>
			<p className="mb-4 text-muted">Invite a new user to join {organization?.name}</p>

			<div>[ PLACEHOLDER ]</div>
		</div>
	);
}
export default OrganizationAddMemberTab;
