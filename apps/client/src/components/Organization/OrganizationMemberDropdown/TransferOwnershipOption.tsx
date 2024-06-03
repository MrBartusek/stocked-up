import { useState } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowRight } from 'react-icons/bs';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
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
	const isOwner = role == 'owner';

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
