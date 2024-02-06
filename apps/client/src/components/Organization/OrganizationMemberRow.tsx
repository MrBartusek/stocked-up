import classNames from 'classnames';
import { BsPersonXFill } from 'react-icons/bs';
import useUserData from '../../hooks/useUserData';
import ActionButton from '../ActionButton';
import Select from '../Helpers/Select';
import UserAvatar from '../UserAvatar';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import RealtimeOrgRoleSelect from '../RealtimeOrgRoleSelect';
import DeleteMemberButton from './DeleteMemberButton';

export interface OrganizationMemberRow {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function OrganizationMemberRow({ organization, rule }: OrganizationMemberRow) {
	const { user } = useUserData(rule.user);
	return (
		<div
			className={classNames(
				'flex items-center justify-between border-b border-gray-200',
				'my-4 px-6 py-4',
			)}
		>
			<div className="flex items-center gap-3">
				<UserAvatar
					user={user}
					variant="circle"
					size={8}
				/>
				{user?.username || 'Loading...'}
			</div>
			<div className="flex gap-2">
				<DeleteMemberButton
					organization={organization}
					rule={rule}
				/>
				<RealtimeOrgRoleSelect
					organization={organization}
					rule={rule}
				/>
			</div>
		</div>
	);
}
export default OrganizationMemberRow;
