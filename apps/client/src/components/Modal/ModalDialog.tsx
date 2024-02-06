import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
import { ModalContext } from './ModalContext';

export interface ModalDialogProps {
	children?: React.ReactNode;
	open?: boolean;
	handleClose?: () => void;
}

function ModalDialog({ children, open: openProp = true, handleClose }: ModalDialogProps) {
	const [open, setOpen] = useState(openProp);

	useEffect(() => {
		setOpen(openProp);
	}, [openProp]);

	function handleCloseInternal() {
		setOpen(false);
	}

	return (
		<ModalContext.Provider value={{ close: handleClose || handleCloseInternal }}>
			<div
				className={classNames(
					'fixed left-0 right-0 top-0 z-40 mt-6 h-full max-h-full w-full',
					'justify-center overflow-y-auto overflow-x-hidden md:inset-0',
					{ hidden: !open },
				)}
			>
				<div className="relative z-50 m-auto max-h-full w-full max-w-2xl p-4">
					<div className="relative rounded-lg border border-gray-300 bg-gray-50 shadow">
						{children}
					</div>
				</div>
				<ModalBackdrop />
			</div>
		</ModalContext.Provider>
	);
}
export default ModalDialog;
