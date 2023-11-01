import { useQuery } from 'react-query';
import { Utils } from '../utils';

function useWarehousesList() {
	const { data, error, isLoading } = useQuery(['warehouses', 'list'], () =>
		Utils.getFetcher(`/api/warehouses`),
	);

	return {
		warehouses: data as BaseWarehouse[],
		isLoading,
		error: error,
	};
}

export default useWarehousesList;
