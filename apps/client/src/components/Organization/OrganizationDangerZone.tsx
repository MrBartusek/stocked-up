import { OrganizationDto } from 'shared-types';
import useUserRole from '../../hooks/useUserRole';
import OrganizationDeleteButton from './OrganizationDeleteButton';
import OrganizationLeaveButton from './OrganizationLeaveButton';

export interface OrganizationDangerZoneProps {
	organization: OrganizationDto;
}

function OrganizationDangerZone({ organization }: OrganizationDangerZoneProps) {
	const { role } = useUserRole(organization.id);

	return (
		<div className="mt-8">
			<h2 className="mb-4 text-2xl">Danger Zone</h2>
			<p className="mb-4 text-muted">Potentially destructive actions, be cautious!</p>
			{role == 'owner' ? (
				<OrganizationDeleteButton />
			) : (
				<OrganizationLeaveButton organization={organization} />
			)}
		</div>
	);
}
export default OrganizationDangerZone;
