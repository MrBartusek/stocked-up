import {
	OnChangeFn,
	SortingState,
	Table,
	TableOptions,
	Updater,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { PageQueryDto, SortDirection } from 'shared-types';
import SortingChangeHandler from '../types/sortingChangeHandler';

export interface UseStockedUpTableProps<TData>
	extends Omit<TableOptions<TData>, 'getCoreRowModel' | 'manualSorting' | 'onSortingChange'> {
	query?: PageQueryDto<any>;
	handleSortingChange?: SortingChangeHandler;
}

function useTableAdapter<TData>({
	query,
	handleSortingChange: sortingChangeHandler,
	...props
}: UseStockedUpTableProps<TData>): Table<TData> {
	function adaptSortingState(query: PageQueryDto | undefined): SortingState {
		if (!query) return [];
		if (!query.orderBy) return [];
		const orderDirection = query.orderDirection || SortDirection.DESC;
		return [{ id: query.orderBy as string, desc: orderDirection == SortDirection.DESC }];
	}

	function handleSortingChange(updater: Updater<SortingState>) {
		if (typeof updater != 'function') return;
		if (!sortingChangeHandler) return;

		const state = updater(adaptSortingState(query));
		if (state.length == 0) {
			sortingChangeHandler({ orderBy: undefined, orderDirection: undefined });
		} else {
			const orderBy = state[0].id;
			const orderDirection = state[0].desc ? SortDirection.DESC : SortDirection.ASC;
			sortingChangeHandler({ orderBy, orderDirection });
		}
	}

	const table = useReactTable({
		...props,
		defaultColumn: {
			...props.defaultColumn,
			size: 99999,
			minSize: 50,
			enableSorting: false,
		},
		manualSorting: true,
		state: {
			sorting: adaptSortingState(query),
		},
		onSortingChange: handleSortingChange,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});
	return table;
}

export default useTableAdapter;
