import { useState } from 'react';
import { BsPersonXFill } from 'react-icons/bs';
import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import ActionButton from '../ActionButton';
import ConfirmMemberDeleteModal from '../ConfirmMemberDeleteModal';

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
