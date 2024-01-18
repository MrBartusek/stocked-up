import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { BasicInventoryItemDto, BasicProductDto, IPageQueryDto } from 'shared-types';
import useTableAdapter from '../../hooks/useTableAdapter';
import SortingChangeHandler from '../../types/sortingChangeHandler';
import Table from '../Helpers/Table/Table';
import TableImage from '../Helpers/Table/TableImage';
import TableIndex from '../Helpers/Table/TableIndex';
import InventoryItemActions from './InventoryItemActions';

const columnHelper = createColumnHelper<BasicInventoryItemDto>();

export interface InventoryTableProps {
	items: BasicInventoryItemDto[];
	query: IPageQueryDto<BasicInventoryItemDto>;
	handleSortingChange: SortingChangeHandler;
}

function InventoryTable({ items, query, handleSortingChange }: InventoryTableProps) {
	const navigate = useNavigate();

	const columns = [
		columnHelper.accessor('name', {
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
		columnHelper.accessor('quantity', {
			header: 'Quantity',
			cell: (info) => `${info.getValue()} ${info.row.original.unit || ''}`,
			enableSorting: true,
		}),
		columnHelper.display({
			header: 'Actions',
			id: 'actions',
			cell: (props) => <InventoryItemActions item={props.row.original} />,
			size: 0,
		}),
	];

	const table = useTableAdapter({
		data: items,
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
export default InventoryTable;
