import axios from 'axios';
import { useQuery } from 'react-query';
import { PageDto, PageQueryDto, WarehouseDto } from 'shared-types';

function useWarehousesList(organizationId: string, query: PageQueryDto<WarehouseDto>) {
	const fetchWarehouses = async (organizationId: string, query: PageQueryDto) => {
		const { data } = await axios.get(`/api/warehouses/list/${organizationId}`, {
			params: query,
		});
		return data as PageDto<WarehouseDto>;
	};

	const { data, error, isLoading } = useQuery<PageDto<WarehouseDto>>(
		['organizations', organizationId, 'warehouses'],
		() => fetchWarehouses(organizationId!, query),
		{ enabled: organizationId != undefined, keepPreviousData: true },
	);

	return {
		warehouses: data,
		isLoading,
		error: error,
	};
}

export default useWarehousesList;
