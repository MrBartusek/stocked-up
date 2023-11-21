import classNames from 'classnames';
import { useState } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export interface ExpandableListProps {
	children?: React.ReactNode;
}

function ExpandableList({ children }: ExpandableListProps) {
	const [open, setOpen] = useState(false);

	function handleClick() {
		setOpen(!open);
	}
	return (
		<>
			{open ? children : null}
			<div className="w-100 flex">
				<button
					className={classNames(
						'text-md flex items-center justify-center gap-2 p-6 text-muted',
						'm-2 flex-1 rounded-md hover:bg-gray-150',
					)}
					onClick={handleClick}
				>
					{open ? (
						<>
							<BsChevronUp className="text-lg" /> Hide
						</>
					) : (
						<>
							<BsChevronDown className="text-lg" /> Expand
						</>
					)}
				</button>
			</div>
		</>
	);
}
export default ExpandableList;
