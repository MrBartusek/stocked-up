import { useQuery } from 'react-query';
import { BasicInventoryItemDto } from 'shared-types';
import { Utils } from '../utils';

function useInventoryList(warehouseId: string) {
	const { data, error, isLoading } = useQuery(
		['inventory', warehouseId],
		() => Utils.getFetcher(`/api/inventory/by-warehouse/${warehouseId}`),
		{
			enabled: warehouseId != undefined,
		},
	);

	return {
		inventory: data as BasicInventoryItemDto[],
		isLoading,
		error: error,
	};
}

export default useInventoryList;
