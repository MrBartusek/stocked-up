import axios from 'axios';
import { useQuery } from 'react-query';
import { IPageQueryDto, PageDto, ProductDto } from 'shared-types';

function useProductsList(organizationId: string, query: IPageQueryDto) {
	const fetchProducts = async (id: string) => {
		const { data } = await axios.get(`/api/products/list/${id}`, { params: query });
		return data as PageDto<ProductDto>;
	};

	const { data, error, isLoading } = useQuery(
		['products', 'list', organizationId, query],
		() => fetchProducts(organizationId),
		{
			enabled: organizationId != undefined,
			keepPreviousData: true,
		},
	);

	return {
		products: data,
		isLoading,
		error: error,
	};
}

export default useProductsList;
