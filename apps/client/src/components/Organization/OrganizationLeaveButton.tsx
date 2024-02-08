import { useState } from 'react';
import { BsPersonDash } from 'react-icons/bs';
import { OrganizationDto } from 'shared-types';
import IconButton from '../IconButton';
import ConfirmOrganizationLeaveModal from './ConfirmOrganizationLeaveModal';

export interface OrganizationLeaveButtonProps {
	organization: OrganizationDto;
}

function OrganizationLeaveButton({ organization }: OrganizationLeaveButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconButton
				icon={BsPersonDash}
				variant="danger"
				onClick={() => setOpen(true)}
			>
				Leave organization
			</IconButton>
			<ConfirmOrganizationLeaveModal
				open={open}
				handleClose={() => setOpen(false)}
				organization={organization}
			/>
		</>
	);
}
export default OrganizationLeaveButton;
