import { BsPersonXFill } from 'react-icons/bs';
import ActionButton from '../ActionButton';
import ConfirmMemberDeleteModal from '../ConfirmMemberDeleteModal';
import { useState } from 'react';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';

export interface DeleteMemberButtonProps {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function DeleteMemberButton({ rule, organization }: DeleteMemberButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ActionButton
				icon={BsPersonXFill}
				className=" text-danger"
				title="Remove from organization"
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
