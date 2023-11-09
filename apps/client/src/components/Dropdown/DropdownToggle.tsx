import { useContext } from 'react';
import { DropdownContext } from './Dropdown';

type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export interface DropdownToggleProps extends ButtonProps {
	children: React.ReactNode;
}

function DropdownToggle({ children, ...props }: DropdownToggleProps) {
	const { refs, getReferenceProps } = useContext(DropdownContext);

	return (
		<button
			ref={refs.setReference}
			{...getReferenceProps()}
			{...props}
		>
			{children}
		</button>
	);
}
export default DropdownToggle;
