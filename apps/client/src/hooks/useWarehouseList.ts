import axios from 'axios';
import { useQuery } from 'react-query';
import { IPageQueryDto, PageDto, WarehouseDto } from 'shared-types';

function useWarehousesList(organizationId: string, query: IPageQueryDto<WarehouseDto>) {
	const fetchWarehouses = async (organizationId: string, query: IPageQueryDto) => {
		const { data } = await axios.get(`/api/warehouses/list/${organizationId}`, {
			params: query,
		});
		return data as PageDto<WarehouseDto>;
	};

	const { data, error, isLoading } = useQuery<PageDto<WarehouseDto>>(
		['warehouses', 'list', organizationId, query],
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
