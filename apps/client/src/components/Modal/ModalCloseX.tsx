import classNames from 'classnames';
import { useContext } from 'react';
import { BsX } from 'react-icons/bs';
import { ModalContext } from './ModalContext';

function ModalCloseX() {
	const { close } = useContext(ModalContext);

	return (
		<button
			onClick={close}
			className={classNames(
				'ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent',
				'text-gray-400 hover:bg-gray-200 hover:text-gray-800',
			)}
		>
			<BsX size={30} />
			<span className="sr-only text-sm">Close modal</span>
		</button>
	);
}
export default ModalCloseX;
