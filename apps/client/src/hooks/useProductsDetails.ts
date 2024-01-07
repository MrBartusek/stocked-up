import axios from 'axios';
import { useQuery } from 'react-query';
import { ProductDto } from 'shared-types';

function useProductsDetails(productId?: string) {
	const fetchProduct = async (id: string) => {
		const { data } = await axios.get(`/api/products/${id}`);
		return data as ProductDto;
	};

	const { data, error, isLoading } = useQuery(
		['products', productId],
		() => fetchProduct(productId!),
		{
			enabled: productId != undefined,
		},
	);

	return {
		product: data,
		isLoading,
		error: error,
	};
}

export default useProductsDetails;
