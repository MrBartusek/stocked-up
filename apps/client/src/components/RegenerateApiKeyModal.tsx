import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowRepeat } from 'react-icons/bs';
import { useQueryClient } from 'react-query';
import { ApiKeyDto } from 'shared-types';
import { Utils } from '../utils/utils';
import Alert from './Helpers/Alert';
import IconButton from './IconButton';
import ModalBody from './Modal/ModalBody';
import ModalCloseButton from './Modal/ModalCloseButton';
import ModalDialog, { ModalDialogProps } from './Modal/ModalDialog';
import ModalHeader from './Modal/ModalHeader';
import ModalTitle from './Modal/ModalTitle';
import ModelFooter from './Modal/ModelFooter';

export interface RegenerateApiKeyModalProps extends ModalDialogProps {}

function RegenerateApiKeyModal(props: RegenerateApiKeyModalProps) {
	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const queryClient = useQueryClient();

	async function handleClick() {
		setLoading(true);
		axios
			.post<ApiKeyDto>(`/api/api-keys/regenerate`)
			.then(() => {
				queryClient.invalidateQueries(['api-keys']);
				toast.success('Successfully re-generated API key');
				if (props.handleClose) {
					props.handleClose();
				}
			})
			.catch((err) => setError(Utils.requestErrorToString(err)))
			.finally(() => setLoading(false));
	}

	return (
		<ModalDialog {...props}>
			<ModalHeader closeButton={!isLoading}>
				<ModalTitle>Regenerate API Key</ModalTitle>
			</ModalHeader>

			<ModalBody>
				{error && <Alert>{error}</Alert>}
				Regenerating your API key will invalidate the old key. Any applications or services using
				the old key will no longer have access to your StockedUp account data. <br />
				Are you sure you want to proceed with generating a new API key?
			</ModalBody>

			<ModelFooter>
				<IconButton
					icon={BsArrowRepeat}
					onClick={handleClick}
					variant="danger"
					disabled={isLoading}
				>
					Regenerate
				</IconButton>
				<ModalCloseButton disabled={isLoading} />
			</ModelFooter>
		</ModalDialog>
	);
}
export default RegenerateApiKeyModal;
