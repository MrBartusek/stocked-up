export interface TableTopBarProps {
	header: string;
	children?: React.ReactNode;
}

function TableTopBar({ header, children }: TableTopBarProps) {
	return (
		<div className="flex items-center justify-between pb-7">
			<p>{header}</p>
			{children}
		</div>
	);
}
export default TableTopBar;
