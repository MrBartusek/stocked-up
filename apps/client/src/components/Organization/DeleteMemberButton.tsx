import { useState } from 'react';
import { BsPersonXFill } from 'react-icons/bs';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import useUserRole from '../../hooks/useUserRole';
import { SecurityUtils } from '../../utils/secuirtyUtils';
import ActionButton, { ActionButtonProps } from '../ActionButton';
import ConfirmMemberDeleteModal from './ConfirmMemberDeleteModal';

export interface DeleteMemberButtonProps extends Omit<ActionButtonProps, 'icon' | 'onClick'> {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function DeleteMemberButton({ rule, organization, ...props }: DeleteMemberButtonProps) {
	const [open, setOpen] = useState(false);

	const { role } = useUserRole(organization.id);
	const canManage = role && SecurityUtils.canManageRole(role, rule.role);

	return (
		<>
			<ActionButton
				{...props}
				icon={BsPersonXFill}
				className="text-danger"
				title="Remove from organization"
				disabled={!canManage || props.disabled}
				onClick={() => setOpen(true)}
			/>
			<ConfirmMemberDeleteModal
				open={open}
				handleClose={() => setOpen(false)}
				organization={organization}
				rule={rule}
			/>
		</>
	);
}
export default DeleteMemberButton;
