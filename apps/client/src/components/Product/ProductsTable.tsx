import { createColumnHelper } from '@tanstack/react-table';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicProductDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import useStockedUpTable from '../../hooks/useStockedUpTable';
import { Utils } from '../../utils';
import Table from '../Helpers/Table';
import TableImage from '../TableImage';
import ProductActions from './ProductActions';

const columnHelper = createColumnHelper<BasicProductDto>();

export interface ProductsTableProps {
	products: BasicProductDto[];
}

function ProductsTable({ products }: ProductsTableProps) {
	const appContext = useContext(CurrentAppContext);
	const navigate = useNavigate();

	const columns = [
		columnHelper.display({
			header: '#',
			cell: (info) => <div className="text-center">{info.row.index + 1}</div>,
			size: 0,
		}),
		columnHelper.accessor('image', {
			header: 'Image',
			cell: (info) => <TableImage image={info.getValue()} />,
			size: 100,
		}),
		columnHelper.accessor('name', {
			header: 'Product Name',
			cell: (info) => info.getValue(),
		}),
		columnHelper.accessor('buyPrice', {
			header: 'Buy Price',
			cell: (info) => Utils.humanizeCurrency(info.getValue(), appContext.organization.currency),
			maxSize: 200,
		}),
		columnHelper.accessor('sellPrice', {
			header: 'Sell Price',
			cell: (info) => Utils.humanizeCurrency(info.getValue(), appContext.organization.currency),
			maxSize: 200,
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

	const table = useStockedUpTable({
		data: products,
		columns,
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
