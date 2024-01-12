import { useContext } from 'react';
import Button, { ButtonProps } from '../Button';
import { ModalContext } from './ModalContext';

export interface ModalCloseButtonProps extends ButtonProps {}

function ModalCloseButton(props: ModalCloseButtonProps) {
	const { close } = useContext(ModalContext);

	return (
		<Button
			{...props}
			variant="secondary-outline"
			onClick={close}
		>
			Close
		</Button>
	);
}
export default ModalCloseButton;
