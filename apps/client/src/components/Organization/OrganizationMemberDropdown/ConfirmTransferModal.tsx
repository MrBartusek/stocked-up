import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowRight } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { ITransferOrganizationDto, OrganizationDto, SecurityRuleDto } from 'shared-types';
import useUserData from '../../../hooks/useUserData';
import { Utils } from '../../../utils/utils';
import Alert from '../../Helpers/Alert';
import IconButton from '../../IconButton';
import ModalBody from '../../Modal/ModalBody';
import ModalCloseButton from '../../Modal/ModalCloseButton';
import ModalDialog, { ModalDialogProps } from '../../Modal/ModalDialog';
import ModalHeader from '../../Modal/ModalHeader';
import ModalTitle from '../../Modal/ModalTitle';
import ModelFooter from '../../Modal/ModelFooter';

export interface ConfirmTransferModalProps extends ModalDialogProps {
	organization: OrganizationDto;
	rule: SecurityRuleDto;
}

function ConfirmTransferModal({ organization, rule, ...props }: ConfirmTransferModalProps) {
	const { user } = useUserData(rule.user);
	const queryClient = useQueryClient();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	function handleClick() {
		setLoading(true);
		setError(null);

		const dto: ITransferOrganizationDto = { user: rule.user };
		axios
			.post(`/api/security/${organization.id}/transfer`, dto)
			.then(() => {
				queryClient.invalidateQueries(['security', organization.id]);
				toast.success(`Transfered organization to ${user?.username}`);
				if (!props.handleClose) return;
				props.handleClose();
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<ModalDialog {...props}>
			<ModalHeader closeButton>
				<ModalTitle>Transfer organization ownership</ModalTitle>
			</ModalHeader>

			<ModalBody>
				{error && <Alert>{error}</Alert>}
				You are about to transfer ownership of this organization ({organization.name}) to{' '}
				{user?.username || '...'}. You will immediately lose owner access, this action is not
				reversible. Are you sure?
			</ModalBody>

			<ModelFooter>
				<IconButton
					icon={BsArrowRight}
					variant="danger"
					loading={loading}
					onClick={handleClick}
				>
					Transfer
				</IconButton>
				<ModalCloseButton />
			</ModelFooter>
		</ModalDialog>
	);
}
export default ConfirmTransferModal;
