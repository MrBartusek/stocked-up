import { BsPencil } from 'react-icons/bs';
import ActionButton from './components/ActionButton';
import { Link } from 'react-router-dom';

export interface UserProfileRowProps {
	title: string;
	action?: React.ReactNode;
	children?: React.ReactNode;
	editButtonTo?: string;
}

function UserProfileRow({ title, action, children, editButtonTo }: UserProfileRowProps) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<div className="flex gap-1">
					<span className="font-medium">{title}</span>
					{action}
				</div>
				<div className="text-muted">{children}</div>
			</div>
			{editButtonTo && (
				<Link to={editButtonTo}>
					<ActionButton
						icon={BsPencil}
						className="h-10 w-10 border border-gray-300 bg-gray-150"
					/>
				</Link>
			)}
		</div>
	);
}
export default UserProfileRow;
