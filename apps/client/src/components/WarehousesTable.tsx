import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import humanFormat from 'human-format';
import { useNavigate } from 'react-router-dom';
import { WarehouseDto } from 'shared-types';
import Table from './Table';
import WarehouseActions from './WarehouseActions';

const columnHelper = createColumnHelper<WarehouseDto>();

const columns = [
	columnHelper.display({
		header: '#',
		cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
		size: 0,
	}),
	columnHelper.accessor('name', {
		header: 'Warehouse Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('address', {
		header: 'Address',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('totalValue', {
		header: 'Total Stock Value',
		cell: (info) => '$' + humanFormat(info.getValue() || 0, { separator: '' }),
	}),
	columnHelper.display({
		header: 'Actions',
		id: 'actions',
		cell: (props) => <WarehouseActions warehouse={props.row.original} />,
		size: 0,
	}),
];

export interface WarehousesTableProps {
	warehouses: WarehouseDto[];
}

function WarehousesTable({ warehouses }: WarehousesTableProps) {
	const navigate = useNavigate();

	const table = useReactTable({
		data: warehouses,
		columns,
		getCoreRowModel: getCoreRowModel(),
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
