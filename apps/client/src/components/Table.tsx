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
								className="p-3 text-left font-semibold text-white first:text-center"
								style={{ width: header.getSize() }}
							>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody className="border-b border-l border-r border-gray-200">
				{table.getRowModel().rows.map((row, i) => (
					<tr
						key={i}
						className={classNames('border-b border-gray-200 last:border-b even:bg-gray-150', {
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
		</table>
	);
}
export default Table;
