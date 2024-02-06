import { OrganizationDto, SecurityRuleDto } from 'shared-types';
import Button from './Button';
import ModalBody from './Modal/ModalBody';
import ModalTitle from './Modal/ModalTitle';
import ModalHeader from './Modal/ModalHeader';
import ModalDialog, { ModalDialogProps } from './Modal/ModalDialog';
import ModelFooter from './Modal/ModelFooter';
import ModalCloseButton from './Modal/ModalCloseButton';
import useUserData from '../hooks/useUserData';
import axios from 'axios';
import { useQueryClient } from 'react-query';
import { useState } from 'react';
import { Utils } from '../utils';
import Alert from './Helpers/Alert';

export interface ConfirmMemberDeleteModalProps extends ModalDialogProps {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function ConfirmMemberDeleteModal({ organization, rule, ...props }: ConfirmMemberDeleteModalProps) {
	const { user } = useUserData(rule.user);
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleClick() {
		setLoading(true);
		setError(null);

		axios
			.delete(`/api/security/${organization.id}/${rule.user}`)
			.then(() => {
				queryClient.invalidateQueries(['security', organization.id]);
				if (!props.handleClose) return;
				props.handleClose();
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
				You are about to remove <span className="font-bold">{rule.role} access</span> from user{' '}
				<span className="font-bold">{user?.username || '...'}</span> to{' '}
				<span className="font-bold">{organization.name}</span> organization. They will immediately
				lose access to all of the organization resources. Are you sure?
			</ModalBody>

			<ModelFooter>
				<Button
					variant="danger"
					loading={loading}
					onClick={handleClick}
				>
					Remove Member
				</Button>
				<ModalCloseButton />
			</ModelFooter>
		</ModalDialog>
	);
}
export default ConfirmMemberDeleteModal;
