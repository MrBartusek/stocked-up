import axios from 'axios';
import { useQuery } from 'react-query';
import { UserDto } from 'shared-types';

function useUserData(userId?: string) {
	const fetchUser = async (id: string) => {
		const { data } = await axios.get(`/api/users/${id}`);
		return data as UserDto;
	};

	const ONE_HOUR = 60 * 60 * 1000;

	const { data, error, isLoading } = useQuery<any>(['users', userId], () => fetchUser(userId!), {
		enabled: userId != undefined,
		refetchOnWindowFocus: false,
		cacheTime: ONE_HOUR,
	});

	return {
		user: data as UserDto,
		isLoading,
		error: error,
	};
}

export default useUserData;
