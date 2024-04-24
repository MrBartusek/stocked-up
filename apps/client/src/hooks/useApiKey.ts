import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiKeyDto } from 'shared-types';

function useApiKey() {
	const fetchApiKey = async () => {
		const { data } = await axios.get(`/api/api-keys`);
		return data as ApiKeyDto;
	};

	const { data, error, isLoading } = useQuery(['api-keys'], () => fetchApiKey());

	return {
		apiKey: data?.apiKey,
		isLoading,
		error: error,
	};
}

export default useApiKey;
