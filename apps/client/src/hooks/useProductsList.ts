import { useQuery } from 'react-query';
import { BasicProductDto } from 'shared-types';
import { Utils } from '../utils';

function useProductsList(organizationId: string) {
	const { data, error, isLoading } = useQuery(
		['products', 'by-org', organizationId],
		() => Utils.getFetcher(`/api/products/by-org/${organizationId}`),
		{
			enabled: organizationId != undefined,
		},
	);

	return {
		products: data as BasicProductDto[],
		isLoading,
		error: error,
	};
}

export default useProductsList;
