import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import humanFormat from 'human-format';
import { useNavigate } from 'react-router-dom';
import { BasicProductDto, ProductDto } from 'shared-types';
import placeholderImage from '../assets/placeholder.png';
import ProductActions from './ProductActions';
import Table from './Table';
import TableImage from './TableImage';

const columnHelper = createColumnHelper<BasicProductDto>();

const columns = [
	columnHelper.accessor('imageUrl', {
		header: '#',
		cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
		size: 0,
	}),
	columnHelper.accessor('imageUrl', {
		header: 'Image',
		cell: (info) => <TableImage src={info.getValue<string>() || placeholderImage} />,
		size: 0,
	}),
	columnHelper.accessor('name', {
		header: 'Product Name',
		cell: (info) => info.getValue(),
	}),
	columnHelper.accessor('buyPrice', {
		header: 'Buy Price',
		cell: (info) => humanFormat(info.getValue(), { separator: '', decimals: 2 }),
	}),
	columnHelper.accessor('sellPrice', {
		header: 'Sell Price',
		cell: (info) => humanFormat(info.getValue(), { separator: '', decimals: 2 }),
	}),
	columnHelper.accessor('unit', {
		header: 'Unit',
		cell: (info) => info.getValue(),
	}),
	columnHelper.display({
		header: 'Actions',
		id: 'actions',
		cell: (props) => <ProductActions product={props.row.original} />,
		size: 0,
	}),
];

export interface ProductsTableProps {
	products: BasicProductDto[];
}

function ProductsTable({ products }: ProductsTableProps) {
	const navigate = useNavigate();

	const table = useReactTable({
		data: products,
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
export default ProductsTable;
