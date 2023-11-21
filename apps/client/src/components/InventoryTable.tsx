import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { BasicInventoryItemDto, BasicProductDto } from 'shared-types';
import Table from './Helpers/Table';
import InventoryItemActions from './InventoryItemActions';

const columnHelper = createColumnHelper<BasicInventoryItemDto>();

export interface InventoryTableProps {
	items: BasicInventoryItemDto[];
}

function InventoryTable({ items }: InventoryTableProps) {
	const navigate = useNavigate();

	const columns = [
		columnHelper.accessor('name', {
			header: '#',
			cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
			size: 0,
		}),
		columnHelper.accessor('name', {
			header: 'Product Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('quantity', {
			header: 'Quantity',
			cell: (info) => `${info.getValue()} ${info.row.original.unit || ''}`,
		}),
		columnHelper.display({
			header: 'Actions',
			id: 'actions',
			cell: (props) => <InventoryItemActions item={props.row.original} />,
			size: 0,
		}),
	];

	const table = useReactTable({
		data: items,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	function onClickRow(product: BasicProductDto) {
		navigate(`view/${product.id}`);
	}

	return (
		<Table
			table={table}
			onClickRow={onClickRow}
		/>
	);
}
export default InventoryTable;
