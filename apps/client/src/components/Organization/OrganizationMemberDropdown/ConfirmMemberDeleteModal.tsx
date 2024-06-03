import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useQueryClient } from 'react-query';
import { IDeleteSecurityRuleDto, OrganizationDto, SecurityRuleDto } from 'shared-types';
import useUserData from '../../../hooks/useUserData';
import { Utils } from '../../../utils/utils';
import Button from '../../Button';
import Alert from '../../Helpers/Alert';
import ModalBody from '../../Modal/ModalBody';
import ModalCloseButton from '../../Modal/ModalCloseButton';
import ModalDialog, { ModalDialogProps } from '../../Modal/ModalDialog';
import ModalHeader from '../../Modal/ModalHeader';
import ModalTitle from '../../Modal/ModalTitle';
import ModelFooter from '../../Modal/ModelFooter';

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

		const dto: IDeleteSecurityRuleDto = {
			organization: organization.id,
			user: rule.user,
		};

		axios
			.delete(`/api/security`, { data: dto })
			.then(() => {
				queryClient.invalidateQueries(['security', organization.id]);
				toast.success(`Removed ${user?.username} from organization`);
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
