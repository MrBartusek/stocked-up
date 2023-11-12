export interface EntityInfoTableProps {
	properties?: { [key: string]: any };
}

function EntityInfoTable({ properties }: EntityInfoTableProps) {
	return (
		<table className="w-full table-fixed border border-gray-200">
			<tbody>
				{properties
					? Object.entries(properties).map(([key, value], i) => (
							<tr
								key={i}
								className="even:bg-gray-100 "
							>
								<td className="border border-gray-200 p-3 font-semibold">{key}</td>
								<td className="w-[75%] flex-1 border border-gray-200 p-3">{value}</td>
							</tr>
					  ))
					: 'Nothing to display'}
			</tbody>
		</table>
	);
}
export default EntityInfoTable;
