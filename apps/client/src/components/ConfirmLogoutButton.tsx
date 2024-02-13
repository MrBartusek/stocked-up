import { useState } from 'react';
import ConfirmLogoutModal from './ConfirmLogoutModal';
import { createPortal } from 'react-dom';

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface ConfirmLogoutButtonProps extends ButtonProps {
	children: React.ReactNode;
}

function ConfirmLogoutButton({ children, ...props }: ConfirmLogoutButtonProps) {
	const [open, setOpen] = useState(false);

	return (
		<>
			{createPortal(
				<ConfirmLogoutModal
					open={open}
					handleClose={() => setOpen(false)}
				/>,
				document.body,
			)}
			<button
				{...props}
				onClick={() => setOpen(true)}
			>
				{children}
			</button>
		</>
	);
}
export default ConfirmLogoutButton;
