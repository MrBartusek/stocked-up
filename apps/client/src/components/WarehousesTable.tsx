import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import humanFormat from 'human-format';
import { useNavigate } from 'react-router-dom';
import ProductActions from './ProductActions';
import Table from './Table';

const columnHelper = createColumnHelper<BaseWarehouse>();

const columns = [
	columnHelper.display({
		header: '#',
		cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
		size: 25,
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
		cell: (props) => <ProductActions row={props.row} />,
		size: 85,
	}),
];

export interface WarehousesTableProps {
	warehouses: BaseWarehouse[];
}

function WarehousesTable({ warehouses }: WarehousesTableProps) {
	const navigate = useNavigate();

	const table = useReactTable({
		data: warehouses,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	function onClickRow(warehouse: BaseWarehouse) {
		navigate(`/dashboard/warehouses/${warehouse._id}`);
	}

	return (
		<Table
			table={table}
			onClickRow={onClickRow}
		/>
	);
}
export default WarehousesTable;
