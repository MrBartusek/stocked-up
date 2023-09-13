import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import Table from './Table';
import Product from '../types/product';
import humanFormat from 'human-format';
import ProductActions from './ProductActions';
import { useNavigate } from 'react-router-dom';

const dummyData: Product[] = [
	{
		id: 293,
		imageUrl: 'https://picsum.photos/200',
		name: 'Product 1',
		buyPrice: 10.99,
		sellPrice: 19.99,
		unit: 'boxes'
	},
	{
		id: 293,
		imageUrl: 'https://picsum.photos/210',
		name: 'Product 2',
		buyPrice: 12.49,
		sellPrice: 24.99,
		unit: 'boxes'
	},
	{
		id: 293,
		imageUrl: 'https://picsum.photos/220',
		name: 'Product 3',
		buyPrice: 8.95,
		sellPrice: 16.99,
		unit: 'boxes'
	},
	{
		id: 293,
		imageUrl: 'https://picsum.photos/230',
		name: 'Product 4',
		buyPrice: 14.99,
		sellPrice: 29.99,
		unit: 'boxes'
	},
	{
		id: 293,
		imageUrl: 'https://picsum.photos/240',
		name: 'Product 5',
		buyPrice: 9.99,
		sellPrice: 19.99,
		unit: 'boxes'
	}
];

const columnHelper = createColumnHelper<Product>();

const columns = [
	columnHelper.accessor('imageUrl', {
		header: '#',
		cell: info => <div className='text-center'>{info.row.index + 1}</div>,
		size: 25
	}),
	columnHelper.accessor('imageUrl', {
		header: 'Image',
		cell: info => (
			<img
				src={info.getValue<string>()}
				alt='product image'
				className='w-full rounded-md'
				width={50}
				height={50}
			/>),
		size: 40
	}),
	columnHelper.accessor('name', {
		header: 'Product Name',
		cell: info => info.getValue()
	}),
	columnHelper.accessor('buyPrice', {
		header: 'Buy Price',
		cell: info => '$' + humanFormat(info.getValue(), {separator: ''})
	}),
	columnHelper.accessor('sellPrice', {
		header: 'Sell Price',
		cell: info => '$' + humanFormat(info.getValue(), {separator: ''})
	}),
	columnHelper.accessor('unit', {
		header: 'Unit',
		cell: info => info.getValue()
	}),
	columnHelper.display({
		header: 'Actions',
		id: 'actions',
		cell: props => <ProductActions row={props.row} />,
		size: 85
	})
];

function ProductsTable() {
	const navigate = useNavigate();

	const table = useReactTable({
		data: dummyData,
		columns,
		getCoreRowModel: getCoreRowModel()
	});

	function onClickRow(product: Product) {
		navigate(`/dashboard/products/${product.id}`);
	}

	return (
		<Table table={table} onClickRow={onClickRow} />
	);
}
export default ProductsTable;
