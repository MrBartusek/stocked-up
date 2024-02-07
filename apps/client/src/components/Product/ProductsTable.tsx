import { createColumnHelper } from '@tanstack/react-table';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BasicProductDto, IPageQueryDto } from 'shared-types';
import { CurrentAppContext } from '../../context/CurrentAppContext';
import useTableAdapter from '../../hooks/useTableAdapter';
import SortingChangeHandler from '../../types/sortingChangeHandler';
import { Utils } from '../../utils/utils';
import Table from '../Helpers/Table/Table';
import TableImage from '../Helpers/Table/TableImage';
import TableIndex from '../Helpers/Table/TableIndex';
import ProductActions from './ProductActions';

const columnHelper = createColumnHelper<BasicProductDto>();

export interface ProductsTableProps {
	products: BasicProductDto[];
	query: IPageQueryDto<BasicProductDto>;
	handleSortingChange?: SortingChangeHandler;
}

function ProductsTable({ products, query, handleSortingChange }: ProductsTableProps) {
	const appContext = useContext(CurrentAppContext);
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
		columnHelper.accessor('image', {
			header: 'Image',
			cell: (info) => <TableImage image={info.getValue()} />,
			size: 100,
		}),
		columnHelper.accessor('name', {
			header: 'Product Name',
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.accessor('buyPrice', {
			header: 'Buy Price',
			cell: (info) => Utils.humanizeCurrency(info.getValue(), appContext.organization.currency),
			maxSize: 200,
			enableSorting: true,
		}),
		columnHelper.accessor('sellPrice', {
			header: 'Sell Price',
			cell: (info) => Utils.humanizeCurrency(info.getValue(), appContext.organization.currency),
			maxSize: 200,
			enableSorting: true,
		}),
		columnHelper.accessor('unit', {
			header: 'Unit',
			cell: (info) => info.getValue(),
			enableSorting: true,
		}),
		columnHelper.display({
			header: 'Actions',
			id: 'actions',
			cell: (props) => <ProductActions product={props.row.original} />,
			size: 0,
		}),
	];

	const table = useTableAdapter({
		data: products,
		sortingStateQuery: query,
		handleSortingChange: handleSortingChange,
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
