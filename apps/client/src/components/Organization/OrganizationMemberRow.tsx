import classNames from 'classnames';
import { useMemo } from 'react';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import useUser from '../../hooks/useUser';
import useUserData from '../../hooks/useUserData';
import RealtimeOrgRoleSelect from '../RealtimeOrgRoleSelect';
import UserAvatar from '../UserAvatar';
import OrganizationMemberDropdown from './OrganizationMemberDropdown/OrganizationMemberDropdown';

export interface OrganizationMemberRow {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function OrganizationMemberRow({ organization, rule }: OrganizationMemberRow) {
	const { user } = useUserData(rule.user);
	const { user: authUser } = useUser();

	const isOwnRow = useMemo(() => user?.id == authUser?.id, [authUser?.id, user?.id]);

	return (
		<div className={classNames('flex items-center justify-between', 'px-6 py-4')}>
			<div className="flex items-center gap-3">
				<UserAvatar
					user={user}
					variant="circle"
					size={8}
				/>
				<span>
					{user?.username || 'Loading...'}
					{isOwnRow && <span className="text-muted"> (you)</span>}
				</span>
			</div>
			<div className="flex gap-2">
				<RealtimeOrgRoleSelect
					isDisabled={isOwnRow || !user}
					organization={organization}
					rule={rule}
				/>
				<OrganizationMemberDropdown
					disabled={isOwnRow || !user}
					organization={organization}
					rule={rule}
				/>
			</div>
		</div>
	);
}
export default OrganizationMemberRow;
