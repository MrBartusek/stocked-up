export interface UserProfileRowProps {
	title: string;
	action?: React.ReactNode;
	children?: React.ReactNode;
}

function UserProfileRow({ title, action, children }: UserProfileRowProps) {
	return (
		<div>
			<div className="flex gap-1">
				<span className="font-medium">{title}</span>
				{action}
			</div>
			<div className="text-muted">{children}</div>
		</div>
	);
}
export default UserProfileRow;
