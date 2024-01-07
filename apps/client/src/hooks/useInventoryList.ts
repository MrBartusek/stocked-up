import axios from 'axios';
import { useQuery } from 'react-query';
import { BasicInventoryItemDto, PageDto } from 'shared-types';

function useInventoryList(warehouseId: string) {
	const fetchInventoryList = async (id: string) => {
		const { data } = await axios.get(`/api/inventory/by-warehouse/${id}`, { params: { page: 1 } });
		return data as PageDto<BasicInventoryItemDto>;
	};

	const { data, error, isLoading } = useQuery(
		['inventory', 'by-warehouse', warehouseId],
		() => fetchInventoryList(warehouseId),
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
