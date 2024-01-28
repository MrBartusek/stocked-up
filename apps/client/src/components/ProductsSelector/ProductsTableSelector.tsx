import { createColumnHelper } from '@tanstack/react-table';
import { BasicProductDto, IPageQueryDto } from 'shared-types';
import useTableAdapter from '../../hooks/useTableAdapter';
import Table from '../Helpers/Table/Table';
import TableImage from '../Helpers/Table/TableImage';
import TableIndex from '../Helpers/Table/TableIndex';

const columnHelper = createColumnHelper<BasicProductDto>();

export interface ProductsTableProps {
	products: BasicProductDto[];
	query: IPageQueryDto<BasicProductDto>;
	onClickRow?: (product: BasicProductDto) => void;
}

function ProductsSelectorTable({ products, query, onClickRow }: ProductsTableProps) {
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
		}),
	];

	const table = useTableAdapter({
		data: products,
		sortingStateQuery: query,
		columns,
	});

	return (
		<Table
			table={table}
			onClickRow={onClickRow}
		/>
	);
}
export default ProductsSelectorTable;
