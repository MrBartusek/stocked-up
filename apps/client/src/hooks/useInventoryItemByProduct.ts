import { useQuery } from 'react-query';
import { InventoryItemDto } from 'shared-types';
import { Utils } from '../utils';

function useInventoryItemByProduct(warehouseId: string, productId: string) {
	const { data, error, isLoading } = useQuery(
		['inventory', 'by-product', warehouseId, productId],
		() =>
			Utils.getFetcher(
				`/api/inventory/by-product?warehouseId=${warehouseId}&productId=${productId}`,
			),
		{
			enabled: warehouseId != undefined && productId != undefined,
			retry(failureCount: number, error: any) {
				if (error?.response?.status == 404) return false;
				return failureCount < 2;
			},
		},
	);

	return {
		inventoryItem: data as InventoryItemDto,
		isLoading,
		error: error,
	};
}

export default useInventoryItemByProduct;
