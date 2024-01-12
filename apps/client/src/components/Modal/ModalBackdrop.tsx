import { useContext } from 'react';
import { ModalContext } from './ModalContext';

function ModalBackdrop() {
	const { close } = useContext(ModalContext);

	return (
		<div
			aria-hidden="true"
			onClick={close}
			className="fixed left-0 right-0 top-0 h-full max-h-full w-full bg-gray-800 opacity-40"
		/>
	);
}
export default ModalBackdrop;
