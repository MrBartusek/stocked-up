import { Link, useOutletContext } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import OrganizationSecurityPanel from '../../Organization/OrganizationSecurityPanel';
import IconButton from '../../IconButton';
import { BsPersonPlus } from 'react-icons/bs';

function OrganizationMembersTab() {
	const organization = useOutletContext<OrganizationDto>();

	return (
		<div className="mt-8">
			<h2 className="mb-4 text-3xl">Organization Members</h2>
			<p className="mb-4 text-muted">
				Organization members are all StockedUp users with access to specific organization.
			</p>

			<OrganizationSecurityPanel organization={organization} />

			<Link to="invite">
				<IconButton
					icon={BsPersonPlus}
					variant="secondary-outline"
					className="mt-12"
				>
					Invite new member
				</IconButton>
			</Link>
		</div>
	);
}
export default OrganizationMembersTab;
