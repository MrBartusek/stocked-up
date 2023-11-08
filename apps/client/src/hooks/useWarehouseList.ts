import { useQuery } from 'react-query';
import { WarehouseDto } from 'shared-types';
import { Utils } from '../utils';

function useWarehousesList(organizationId?: string) {
	const { data, error, isLoading } = useQuery<any>(
		['organizations', organizationId, 'warehouses'],
		() => Utils.getFetcher(`/api/organizations/${organizationId}/warehouses`),
		{ enabled: organizationId != undefined },
	);

	return {
		warehouses: data as WarehouseDto[],
		isLoading,
		error: error,
	};
}

export default useWarehousesList;
