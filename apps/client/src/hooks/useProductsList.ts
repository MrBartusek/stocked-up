import { useQuery } from 'react-query';
import { Utils } from '../utils';
import SharedTypes from 'shared-types';

function useProductsList() {
	const { data, error, isLoading } = useQuery(['products', 'list'], () =>
		Utils.simpleFetcher(`/api/products`),
	);

	return {
		products: data as SharedTypes.Product[],
		isLoading,
		error: error,
	};
}

export default useProductsList;
