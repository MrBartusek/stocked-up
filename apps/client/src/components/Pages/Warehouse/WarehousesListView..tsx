import { useContext } from 'react';
import { WarehouseDto } from 'shared-types';
import { CurrentAppContext } from '../../../context/CurrentAppContext';
import usePageQueryState from '../../../hooks/usePageQueryState';
import useWarehousesList from '../../../hooks/useWarehouseList';
import Loader from '../../Loader';
import Pagination from '../../Pagination';
import WarehousesTable from '../../Warehouse/WarehousesTable';

function WarehousesListView() {
	const appContext = useContext(CurrentAppContext);

	const { query } = usePageQueryState<WarehouseDto>();
	const { warehouses, isLoading, error } = useWarehousesList(appContext.organization.id, query);

	return (
		<Loader
			isLoading={isLoading}
			isError={error != undefined}
		>
			{warehouses && (
				<>
					<WarehousesTable
						query={query}
						warehouses={warehouses.data}
					/>
					<Pagination meta={warehouses.meta} />
				</>
			)}
		</Loader>
	);
}

export default WarehousesListView;
