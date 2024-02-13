import { useContext } from 'react';
import toast from 'react-hot-toast';
import { BsBoxArrowLeft, BsTrash3 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Alert from './Helpers/Alert';
import IconButton from './IconButton';
import ModalBody from './Modal/ModalBody';
import ModalCloseButton from './Modal/ModalCloseButton';
import ModalDialog, { ModalDialogProps } from './Modal/ModalDialog';
import ModalHeader from './Modal/ModalHeader';
import ModalTitle from './Modal/ModalTitle';
import ModelFooter from './Modal/ModelFooter';

export interface ConfirmLogoutModalProps extends ModalDialogProps {}

function ConfirmLogoutModal(props: ConfirmLogoutModalProps) {
	const { user, logout } = useContext(UserContext);
	const navigate = useNavigate();

	async function handleClick() {
		navigate('/');
		await logout();
		toast.success('Successfully logged out');
	}

	return (
		<ModalDialog {...props}>
			<ModalHeader closeButton>
				<ModalTitle>Logout</ModalTitle>
			</ModalHeader>

			<ModalBody>
				{user.isDemo && (
					<Alert className="mb-2">
						<BsTrash3 />
						This action is going to delete this demo account{' '}
					</Alert>
				)}
				Are you sure do you want to logout?
			</ModalBody>

			<ModelFooter>
				<IconButton
					icon={BsBoxArrowLeft}
					onClick={handleClick}
				>
					Logout
				</IconButton>
				<ModalCloseButton />
			</ModelFooter>
		</ModalDialog>
	);
}
export default ConfirmLogoutModal;
