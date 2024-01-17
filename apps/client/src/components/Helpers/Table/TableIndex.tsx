import { CellContext } from '@tanstack/react-table';
import { IPageQueryDto } from 'shared-types';

export interface TableIndex<T = any> {
	info: CellContext<T, any>;
	query: IPageQueryDto<T>;
}

function TableIndex({ info, query }: TableIndex) {
	const skip = ((query.page || 1) - 1) * (query.pageSize || 10);

	return <div className="text-center">{info.row.index + skip + 1}</div>;
}
export default TableIndex;
