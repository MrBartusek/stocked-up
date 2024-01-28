import {
	SortingState,
	Table,
	TableOptions,
	Updater,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { IPageQueryDto } from 'shared-types';
import SortingChangeHandler from '../types/sortingChangeHandler';

/**
 * For some reason Rollup doesn't want to import SortDirection from shared-types
 * in this file, so it needs to be hard-coded here
 */
enum SortDirection {
	DESC = 'desc',
	ASC = 'asc',
}

export interface UseTableAdapterProps<TData>
	extends Omit<TableOptions<TData>, 'getCoreRowModel' | 'manualSorting' | 'onSortingChange'> {
	sortingStateQuery?: IPageQueryDto<any>;
	handleSortingChange?: SortingChangeHandler;
}

function useTableAdapter<TData>({
	sortingStateQuery,
	handleSortingChange: sortingChangeHandler,
	...props
}: UseTableAdapterProps<TData>): Table<TData> {
	function adaptSortingState(query: IPageQueryDto | undefined): SortingState {
		if (!query) return [];
		if (!query.orderBy) return [];

		const orderDirection = query.orderDirection || SortDirection.DESC;
		return [{ id: query.orderBy as string, desc: orderDirection == SortDirection.DESC }];
	}

	function handleSortingChange(updater: Updater<SortingState>) {
		if (typeof updater != 'function') return;
		if (!sortingChangeHandler) return;

		const state = updater(adaptSortingState(sortingStateQuery));

		if (state.length == 0) {
			sortingChangeHandler({ orderBy: undefined, orderDirection: undefined });
			return;
		}

		const orderBy = state[0].id;
		const orderDirection = state[0].desc ? SortDirection.DESC : SortDirection.ASC;
		sortingChangeHandler({ orderBy, orderDirection });
	}

	const table = useReactTable({
		...props,

		defaultColumn: {
			...props.defaultColumn,
			size: 99999,
			minSize: 50,
			enableSorting: false,
		},

		state: {
			sorting: adaptSortingState(sortingStateQuery),
		},
		manualSorting: true,

		onSortingChange: handleSortingChange,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});
	return table;
}

export default useTableAdapter;
