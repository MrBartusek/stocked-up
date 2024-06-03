import { useState } from 'react';
import { createPortal } from 'react-dom';
import { BsPersonXFill } from 'react-icons/bs';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import useUserRole from '../../../hooks/useUserRole';
import { SecurityUtils } from '../../../utils/securityUtils';
import { ActionButtonProps } from '../../ActionButton';
import DropdownItem from '../../Dropdown/DropdownItem';
import ConfirmMemberDeleteModal from './ConfirmMemberDeleteModal';

export interface RemoveMemberOptionProps extends Omit<ActionButtonProps, 'icon' | 'onClick'> {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function RemoveMemberOption({ rule, organization, ...props }: RemoveMemberOptionProps) {
	const [open, setOpen] = useState(false);

	const { role } = useUserRole(organization.id);
	const canManage = role && SecurityUtils.canManageRole(role, rule.role);

	return (
		<>
			{createPortal(
				<ConfirmMemberDeleteModal
					open={open}
					handleClose={() => setOpen(false)}
					organization={organization}
					rule={rule}
				/>,
				document.body,
			)}
			<DropdownItem
				icon={BsPersonXFill}
				title="Remove from organization"
				disabled={!canManage || props.disabled}
				onClick={() => setOpen(true)}
			>
				Remove
			</DropdownItem>
		</>
	);
}
export default RemoveMemberOption;
