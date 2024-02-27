import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { IPageQueryDto, WarehouseDto } from 'shared-types';
import useTableAdapter from '../../hooks/useTableAdapter';
import SortingChangeHandler from '../../types/sortingChangeHandler';
import Currency from '../Helpers/Currency';
import Table from '../Helpers/Table/Table';
import TableIndex from '../Helpers/Table/TableIndex';
import WarehouseActions from './WarehouseActions';

const columnHelper = createColumnHelper<WarehouseDto>();

export interface WarehousesTableProps {
	warehouses: WarehouseDto[];
	query: IPageQueryDto<WarehouseDto>;
	handleSortingChange: SortingChangeHandler;
}

function WarehousesTable({ warehouses, query, handleSortingChange }: WarehousesTableProps) {
	const navigate = useNavigate();

	const columns = [
		columnHelper.display({
			header: '#',
			cell: (info) => (
				<TableIndex
					info={info}
					query={query}
				/>
			),
			size: 0,
		}),
		columnHelper.accessor('name', {
			header: 'Warehouse Name',
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.accessor('address', {
			header: 'Address',
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.accessor('totalValue', {
			header: 'Total Stock Value',
			cell: (info) => <Currency>{info.getValue()}</Currency>,
			enableSorting: true,
		}),
		columnHelper.display({
			header: 'Actions',
			id: 'actions',
			cell: (props) => <WarehouseActions warehouse={props.row.original} />,
			size: 0,
		}),
	];

	const table = useTableAdapter({
		data: warehouses,
		sortingStateQuery: query,
		handleSortingChange,
		columns,
	});

	function onClickRow(warehouse: WarehouseDto) {
		navigate(`view/${warehouse.id}`);
	}

	return (
		<Table
			table={table}
			onClickRow={onClickRow}
		/>
	);
}
export default WarehousesTable;
