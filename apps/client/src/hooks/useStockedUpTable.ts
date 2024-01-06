import { Table, TableOptions, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export interface UseStockedUpTableProps<TData>
	extends Omit<TableOptions<TData>, 'getCoreRowModel'> {}

function useStockedUpTable<TData>(props: UseStockedUpTableProps<TData>): Table<TData> {
	const table = useReactTable({
		...props,
		defaultColumn: {
			...props.defaultColumn,
			size: 99999,
			minSize: 50,
		},
		getCoreRowModel: getCoreRowModel(),
	});
	return table;
}

export default useStockedUpTable;
