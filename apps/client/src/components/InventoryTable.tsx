import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicInventoryItemDto, BasicProductDto } from 'shared-types';
import placeholderImage from '../assets/placeholder.png';
import { Utils } from '../utils';
import { CurrentAppContext } from './Context/CurrentAppContext';
import ProductActions from './ProductActions';
import Table from './Table';
import TableImage from './TableImage';
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
			cell: (info) => info.getValue() + info.row.original.quantity,
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
