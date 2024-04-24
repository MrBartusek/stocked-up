import { useState } from 'react';
import { createPortal } from 'react-dom';
import { BsArrowRepeat } from 'react-icons/bs';
import IconButton, { IconButtonProps } from './IconButton';
import RegenerateApiKeyModal from './RegenerateApiKeyModal';

export interface RegenerateApiKeyButtonProps extends IconButtonProps {}

function RegenerateApiKeyButton({ ...props }: RegenerateApiKeyButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{createPortal(
				<RegenerateApiKeyModal
					open={open}
					handleClose={() => setOpen(false)}
				/>,
				document.body,
			)}
			<IconButton
				icon={BsArrowRepeat}
				onClick={() => setOpen(true)}
				{...props}
			>
				Generate new API Key
			</IconButton>
		</>
	);
}
export default RegenerateApiKeyButton;
