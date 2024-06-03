import { useState } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowRight } from 'react-icons/bs';
import { OrganizationDto, OrganizationSecurityRole, SecurityRuleDto } from 'shared-types';
import useUserRole from '../../../hooks/useUserRole';
import { ActionButtonProps } from '../../ActionButton';
import DropdownItem from '../../Dropdown/DropdownItem';
import ConfirmTransferModal from './ConfirmTransferModal';

export interface TransferOwnershipOptionProps extends Omit<ActionButtonProps, 'icon' | 'onClick'> {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function TransferOwnershipOption({ rule, organization, ...props }: TransferOwnershipOptionProps) {
	const [open, setOpen] = useState(false);

	const { role } = useUserRole(organization.id);
	const isOwner = role == OrganizationSecurityRole.OWNER;

	return (
		<>
			{createPortal(
				<ConfirmTransferModal
					open={open}
					handleClose={() => setOpen(false)}
					organization={organization}
					rule={rule}
				/>,
				document.body,
			)}
			<DropdownItem
				icon={BsArrowRight}
				title="Transfer ownership"
				disabled={!isOwner || props.disabled}
				onClick={() => setOpen(true)}
			>
				Transfer ownership
			</DropdownItem>
		</>
	);
}
export default TransferOwnershipOption;
