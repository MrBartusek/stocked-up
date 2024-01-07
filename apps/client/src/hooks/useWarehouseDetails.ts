import axios from 'axios';
import { useQuery } from 'react-query';
import { WarehouseDto } from 'shared-types';

function useWarehouseDetails(warehouseId?: string) {
	const fetchWarehouse = async (id: string) => {
		const { data } = await axios.get(`/api/warehouses/${id}`);
		return data as WarehouseDto;
	};

	const { data, error, isLoading } = useQuery(
		['warehouses', warehouseId],
		() => fetchWarehouse(warehouseId!),
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
