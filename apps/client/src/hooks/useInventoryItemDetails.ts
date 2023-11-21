import { useQuery } from 'react-query';
import { InventoryItemDto } from 'shared-types';
import { Utils } from '../utils';

function useInventoryItemDetails(inventoryItemId: string) {
	const { data, error, isLoading } = useQuery(
		['inventory', inventoryItemId],
		() => Utils.getFetcher(`/api/inventory/${inventoryItemId}`),
		{
			enabled: inventoryItemId != undefined,
		},
	);

	return {
		inventoryItem: data as InventoryItemDto,
		isLoading,
		error: error,
	};
}

export default useInventoryItemDetails;
