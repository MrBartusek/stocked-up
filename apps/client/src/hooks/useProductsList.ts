import axios from 'axios';
import { useQuery } from 'react-query';
import { PageDto, ProductDto } from 'shared-types';

function useProductsList(organizationId: string) {
	const fetchProducts = async (id: string) => {
		const { data } = await axios.get(`/api/products/list/${id}`, { params: { page: 1 } });
		return data as PageDto<ProductDto>;
	};

	const { data, error, isLoading } = useQuery(
		['products', 'list', organizationId],
		() => fetchProducts(organizationId),
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
