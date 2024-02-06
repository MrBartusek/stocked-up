import classNames from 'classnames';
import { BsPersonXFill } from 'react-icons/bs';
import useUserData from '../../hooks/useUserData';
import ActionButton from '../ActionButton';
import Select from '../Helpers/Select';
import UserAvatar from '../UserAvatar';
import { SecurityRuleDto } from 'shared-types';

export interface OrganizationMemberRow {
	rule: SecurityRuleDto;
}

function OrganizationMemberRow({ rule }: OrganizationMemberRow) {
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
				<ActionButton
					icon={BsPersonXFill}
					className=" text-danger"
					title="Remove from organization"
				/>
				<Select
					className="w-32"
					options={[
						{ label: 'Admin', value: 'Admin' },
						{ label: 'Member', value: 'Member' },
					]}
				></Select>
			</div>
		</div>
	);
}
export default OrganizationMemberRow;
