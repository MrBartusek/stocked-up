import axios from 'axios';
import { useQuery } from 'react-query';
import { BasicInventoryItemDto, IPageQueryDto, PageDto } from 'shared-types';

function useInventoryList(warehouseId: string, query: IPageQueryDto<BasicInventoryItemDto>) {
	const fetchInventoryList = async (id: string) => {
		const { data } = await axios.get(`/api/inventory/by-warehouse/${id}`, { params: query });
		return data as PageDto<BasicInventoryItemDto>;
	};

	const { data, error, isLoading } = useQuery(
		['inventory', 'by-warehouse', warehouseId, query],
		() => fetchInventoryList(warehouseId),
		{
			enabled: warehouseId != undefined,
			keepPreviousData: true,
		},
	);

	return {
		inventory: data,
		isLoading,
		error: error,
	};
}

export default useInventoryList;
