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
			<p className="text-muted">Potentially destructive actions, be cautious!</p>
			<div className="mt-6 inline-flex flex-col gap-6">
				<OrganizationLeaveButton organization={organization} />
				{role == 'owner' && <OrganizationDeleteButton />}
			</div>
		</div>
	);
}
export default OrganizationDangerZone;
