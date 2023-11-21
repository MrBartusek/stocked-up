import classNames from 'classnames';

type TableProps = React.DetailedHTMLProps<
	React.TableHTMLAttributes<HTMLTableElement>,
	HTMLTableElement
>;

export interface EntityInfoTableProps extends TableProps {
	properties?: { [key: string]: any };
}

function EntityInfoTable({ properties, ...props }: EntityInfoTableProps) {
	return (
		<table
			{...props}
			className={classNames(props.className, 'w-full table-fixed border border-gray-200')}
		>
			<tbody>
				{properties
					? Object.entries(properties).map(([key, value], i) => (
							<tr
								key={i}
								className="even:bg-gray-100 "
							>
								<td className="border border-gray-200 p-3 font-semibold">{key}</td>
								<td className="w-[75%] flex-1 border border-gray-200 p-3">
									{value !== null && value !== undefined && value !== '' ? (
										value
									) : (
										<span className="italic text-muted">not provided</span>
									)}
								</td>
							</tr>
					  ))
					: 'Nothing to display'}
			</tbody>
		</table>
	);
}
export default EntityInfoTable;
