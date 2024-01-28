import { useContext } from 'react';
import { BasicInventoryItemDto } from 'shared-types';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import useInventoryList from '../../../hooks/useInventoryList';
import usePageQueryState from '../../../hooks/usePageQueryState';
import InventoryTable from '../../InventoryItem/InventoryTable';
import Loader from '../../Loader';
import Pagination from '../../Pagination';

function InventoryListView() {
	const appContext = useContext(CurrentAppContext);
	const { query, handleSortingChange, handlePageChange, handlePageSizeChange } =
		usePageQueryState<BasicInventoryItemDto>();
	const { inventory, isLoading, error } = useInventoryList(appContext.currentWarehouse.id, query);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			{inventory && (
				<>
					<InventoryTable
						items={inventory.items}
						query={query}
						handleSortingChange={handleSortingChange}
					/>
					<Pagination
						meta={inventory.meta}
						handlePageChange={handlePageChange}
						handlePageSizeChange={handlePageSizeChange}
					/>
				</>
			)}
		</Loader>
	);
}
export default InventoryListView;
