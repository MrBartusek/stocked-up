import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { OrganizationDto } from 'shared-types';
import { Utils } from '../../utils/utils';
import Button from '../Button';
import Alert from '../Helpers/Alert';
import ModalBody from '../Modal/ModalBody';
import ModalCloseButton from '../Modal/ModalCloseButton';
import ModalDialog, { ModalDialogProps } from '../Modal/ModalDialog';
import ModalHeader from '../Modal/ModalHeader';
import ModalTitle from '../Modal/ModalTitle';
import ModelFooter from '../Modal/ModelFooter';

export interface ConfirmOrganizationLeaveModalProps extends ModalDialogProps {
	organization: OrganizationDto;
}

function ConfirmOrganizationLeaveModal({
	organization,
	...props
}: ConfirmOrganizationLeaveModalProps) {
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	function handleClick() {
		setLoading(true);
		setError(null);

		axios
			.delete(`/api/security/${organization.id}/leave`)
			.then(() => {
				if (props.handleClose) {
					props.handleClose();
				}
				navigate('/dashboard');
				queryClient.invalidateQueries(['security', organization.id]);
				toast.success(`You have left ${organization.name}`);
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<ModalDialog {...props}>
			<ModalHeader closeButton>
				<ModalTitle>Confirm the action</ModalTitle>
			</ModalHeader>

			<ModalBody>
				{error && <Alert>{error}</Alert>}
				<p>
					You are about to leave <span className="font-bold">{organization.name}</span>{' '}
					organization. You will immediately lose access to all of the organization resources.
				</p>
				<p>
					You will need an invite from organization administrator to join once again. This is a
					potentially destructive action!
				</p>
				<p>Are you sure do you want to proceed?</p>
			</ModalBody>

			<ModelFooter>
				<Button
					variant="danger"
					loading={loading}
					onClick={handleClick}
				>
					Leave organization
				</Button>
				<ModalCloseButton />
			</ModelFooter>
		</ModalDialog>
	);
}
export default ConfirmOrganizationLeaveModal;
