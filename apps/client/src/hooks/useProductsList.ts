import { useQuery } from 'react-query';
import { BasicProductDto, PageDto } from 'shared-types';
import { Utils } from '../utils';

function useProductsList(organizationId: string) {
	const { data, error, isLoading } = useQuery<PageDto<BasicProductDto>>(
		['products', 'list', organizationId],
		() => Utils.getFetcher(`/api/products/list/${organizationId}?page=1`),
		{
			enabled: organizationId != undefined,
		},
	);

	return {
		products: data?.data,
		isLoading,
		error: error,
	};
}

export default useProductsList;
