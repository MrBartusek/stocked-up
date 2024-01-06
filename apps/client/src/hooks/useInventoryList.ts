import { useQuery } from 'react-query';
import { BasicInventoryItemDto, InventoryItemDto, PageDto } from 'shared-types';
import { Utils } from '../utils';

function useInventoryList(warehouseId: string) {
	const { data, error, isLoading } = useQuery(
		['inventory', 'by-warehouse', warehouseId],
		() =>
			Utils.getFetcher<PageDto<BasicInventoryItemDto>>(
				`/api/inventory/by-warehouse/${warehouseId}?page=1`,
			),
		{
			enabled: warehouseId != undefined,
		},
	);

	return {
		inventory: data?.data,
		isLoading,
		error: error,
	};
}

export default useInventoryList;
