import { Table as TableType, flexRender } from '@tanstack/react-table';
import classNames from 'classnames';

export interface TableProps {
	table: TableType<any>;
	onClickRow?: (value: any) => void;
}

function Table({ table, onClickRow }: TableProps) {
	const data = table.getRowModel().rows;

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full table-fixed">
				<thead className="bg-gray-700">
					{table.getHeaderGroups().map((headerGroup, i) => (
						<tr key={i}>
							{headerGroup.headers.map((header, i) => (
								<th
									key={i}
									className="p-3 text-center font-semibold text-white"
									style={{ width: header.getSize() + 'px' }}
								>
									{flexRender(header.column.columnDef.header, header.getContext())}
								</th>
							))}
						</tr>
					))}
				</thead>
				{data.length > 0 ? (
					<tbody className="border-b border-l border-r border-gray-200">
						{data.map((row, i) => (
							<tr
								key={i}
								className={classNames('border-b border-gray-200 last:border-b even:bg-gray-100', {
									'cursor-pointer hover:bg-gray-200': onClickRow,
								})}
								onClick={() => (onClickRow ? onClickRow(row.original) : null)}
							>
								{row.getVisibleCells().map((cell, i) => (
									<td
										key={i}
										className="p-3"
									>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				) : null}
			</table>
			{data.length == 0 ? (
				<div className="p-4 text-center text-muted">This table is empty</div>
			) : null}
		</div>
	);
}
export default Table;
