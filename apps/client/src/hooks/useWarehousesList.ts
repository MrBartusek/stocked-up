import { useQuery } from 'react-query';
import { Utils } from '../utils';
import SharedTypes from 'shared-types';

function useWarehousesList() {
	const { data, error, isLoading } = useQuery(['warehouses', 'list'], () =>
		Utils.simpleFetcher(`/api/warehouses`),
	);

	return {
		warehouses: data as SharedTypes.BaseWarehouse[],
		isLoading,
		error: error,
	};
}

export default useWarehousesList;
