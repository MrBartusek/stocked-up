export interface TableTopBarProps {
	header: string;
	children?: React.ReactNode;
}

function TableTopBar({ header, children }: TableTopBarProps) {
	return (
		<div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
			<p>{header}</p>
			{children}
		</div>
	);
}
export default TableTopBar;
