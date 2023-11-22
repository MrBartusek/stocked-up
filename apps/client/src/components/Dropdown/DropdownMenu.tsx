import classNames from 'classnames';
import { useContext } from 'react';
import { DropdownContext } from './Dropdown';

type DivProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export interface DropdownMenuProps extends DivProps {}

function DropdownMenu({ className, ...props }: DropdownMenuProps) {
	const { isOpen, refs, floatingStyles, getFloatingProps } = useContext(DropdownContext);

	return (
		<>
			{isOpen ? (
				<div
					ref={refs.setFloating}
					style={floatingStyles}
					{...getFloatingProps()}
					{...props}
					className={classNames(
						'z-10 mt-2 w-60 rounded-md bg-gray-50 py-3 shadow-lg',
						'ring-2 ring-black ring-opacity-5',
						className,
					)}
				/>
			) : null}
		</>
	);
}
export default DropdownMenu;
