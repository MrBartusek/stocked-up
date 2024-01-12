import classNames from 'classnames';
import React, { useState } from 'react';
import ModalBackdrop from './ModalBackdrop';
import { ModalContext } from './ModalContext';

export interface ModalDialogProps {
	children?: React.ReactNode;
	open?: boolean;
}

function ModalDialog({ children, open: openProp = true }: ModalDialogProps) {
	const [open, setOpen] = useState(openProp);

	function handleClose() {
		console.log('hide');
		setOpen(false);
	}

	return (
		<ModalContext.Provider value={{ close: handleClose }}>
			<div
				className={classNames(
					'fixed left-0 right-0 top-0 z-40 h-full max-h-full w-full',
					'justify-center overflow-y-auto overflow-x-hidden md:inset-0',
					{ hidden: !open },
				)}
			>
				<div className="relative z-50 m-auto max-h-full w-full max-w-3xl p-4 md:mt-16">
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
