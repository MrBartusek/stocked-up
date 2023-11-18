import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import humanFormat from 'human-format';
import { useNavigate } from 'react-router-dom';
import { BasicProductDto, ProductDto } from 'shared-types';
import placeholderImage from '../assets/placeholder.png';
import ProductActions from './ProductActions';
import Table from './Table';
import TableImage from './TableImage';
import { Utils } from '../utils';
import { useContext } from 'react';
import { CurrentAppContext } from './Context/CurrentAppContext';

const columnHelper = createColumnHelper<BasicProductDto>();

export interface ProductsTableProps {
	products: BasicProductDto[];
}

function ProductsTable({ products }: ProductsTableProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

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
			cell: (info) => Utils.humanizeCurrency(info.getValue(), appContext.organization.currency),
		}),
		columnHelper.accessor('sellPrice', {
			header: 'Sell Price',
			cell: (info) => Utils.humanizeCurrency(info.getValue(), appContext.organization.currency),
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
