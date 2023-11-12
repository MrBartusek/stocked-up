import { useQuery } from 'react-query';
import { ProductDto } from 'shared-types';
import { Utils } from '../utils';

function useProductsDetails(productId?: string) {
	const { data, error, isLoading } = useQuery(
		['products', productId],
		() => Utils.getFetcher(`/api/products/${productId}`),
		{
			enabled: productId != undefined,
		},
	);

	return {
		product: data as ProductDto | undefined,
		isLoading,
		error: error,
	};
}

export default useProductsDetails;
