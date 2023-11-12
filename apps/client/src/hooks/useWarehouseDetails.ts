import { useQuery } from 'react-query';
import { WarehouseDto } from 'shared-types';
import { Utils } from '../utils';

function useWarehouseDetails(warehouseId?: string) {
	const { data, error, isLoading } = useQuery(
		['warehouses', warehouseId],
		() => Utils.getFetcher(`/api/warehouses/${warehouseId}`),
		{
			enabled: warehouseId != undefined,
		},
	);

	return {
		warehouse: (data as WarehouseDto) || {},
		isLoading: isLoading,
		error: error,
	};
}

export default useWarehouseDetails;
