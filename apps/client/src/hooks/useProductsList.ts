import useSWR from 'swr';
import { Utils } from '../utils';
import SharedTypes from 'shared-types';

function useProductsList() {
	const { data, error, isLoading } = useSWR(`/api/products`, Utils.simpleFetcher);

	return {
		products: data as SharedTypes.Product[],
		isLoading,
		isError: error,
	};
}

export default useProductsList;
