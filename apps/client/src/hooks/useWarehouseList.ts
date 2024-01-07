import axios from 'axios';
import { useQuery } from 'react-query';
import { WarehouseDto } from 'shared-types';

function useWarehousesList(organizationId?: string) {
	const fetchWarehouses = async (organizationId: string) => {
		const { data } = await axios.get(`/api/organizations/${organizationId}/warehouses`);
		return data as WarehouseDto[];
	};

	const { data, error, isLoading } = useQuery<any>(
		['organizations', organizationId, 'warehouses'],
		() => fetchWarehouses(organizationId!),
		{ enabled: organizationId != undefined },
	);

	return {
		warehouses: data as WarehouseDto[],
		isLoading,
		error: error,
	};
}

export default useWarehousesList;
