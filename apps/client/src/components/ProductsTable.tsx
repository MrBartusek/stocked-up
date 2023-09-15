import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from './Table';
import humanFormat from 'human-format';
import ProductActions from './ProductActions';
import { useNavigate } from 'react-router-dom';
import SharedTypes from 'shared-types';
import placeholderImage from '../assets/placeholder.png';

const columnHelper = createColumnHelper<SharedTypes.Product>();

const columns = [
	columnHelper.accessor('imageUrl', {
		header: '#',
		cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
		size: 25,
	}),
	columnHelper.accessor('imageUrl', {
		header: 'Image',
		cell: (info) => (
			<img
				src={info.getValue<string>() || placeholderImage}
				alt="product image"
				className="w-full rounded-md"
				width={50}
				height={50}
			/>
		),
		size: 40,
	}),
	columnHelper.accessor('name', {
		header: 'Product Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('buyPrice', {
		header: 'Buy Price',
		cell: (info) => '$' + humanFormat(info.getValue(), { separator: '' }),
	}),
	columnHelper.accessor('sellPrice', {
		header: 'Sell Price',
		cell: (info) => '$' + humanFormat(info.getValue(), { separator: '' }),
	}),
	columnHelper.accessor('unit', {
		header: 'Unit',
		cell: (info) => info.getValue(),
	}),
	columnHelper.display({
		header: 'Actions',
		id: 'actions',
		cell: (props) => <ProductActions row={props.row} />,
		size: 85,
	}),
];

export interface ProductsTableProps {
	products: SharedTypes.Product[];
}

function ProductsTable({ products }: ProductsTableProps) {
	const navigate = useNavigate();

	const table = useReactTable({
		data: products,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	function onClickRow(product: SharedTypes.Product) {
		navigate(`/dashboard/products/${product._id}`);
	}

	return (
		<Table
			table={table}
			onClickRow={onClickRow}
		/>
	);
}
export default ProductsTable;
