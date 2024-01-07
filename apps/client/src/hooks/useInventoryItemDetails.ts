import axios from 'axios';
import { useQuery } from 'react-query';
import { InventoryItemDto } from 'shared-types';

function useInventoryItemDetails(inventoryItemId?: string) {
	const fetchInventoryItem = async (id: string) => {
		const { data } = await axios.get(`/api/inventory/${id}`);
		return data as InventoryItemDto;
	};

	const { data, error, isLoading } = useQuery(
		['inventory', inventoryItemId],
		() => fetchInventoryItem(inventoryItemId!),
		{
			enabled: inventoryItemId != undefined,
		},
	);

	return {
		inventoryItem: data,
		isLoading,
		error: error,
	};
}

export default useInventoryItemDetails;
