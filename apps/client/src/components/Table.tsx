import { Table as TableType, flexRender } from '@tanstack/react-table';
import classNames from 'classnames';

export interface TableProps {
	table: TableType<any>;
	onClickRow?: (value: any) => void;
}

function Table({ table, onClickRow }: TableProps) {
	return (
		<table className="w-full table-fixed">
			<thead className="bg-gray-700">
				{table.getHeaderGroups().map((headerGroup, i) => (
					<tr key={i}>
						{headerGroup.headers.map((header, i) => (
							<th
								key={i}
								className="p-3 text-white font-semibold text-left first:text-center"
								style={{ width: header.getSize() }}
							>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody className="border-l border-r border-b border-gray-200">
				{table.getRowModel().rows.map((row, i) => (
					<tr
						key={i}
						className={classNames('even:bg-gray-150 border-b border-gray-200 last:border-b', {
							'hover:bg-gray-200 cursor-pointer': onClickRow,
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
		</table>
	);
}
export default Table;
