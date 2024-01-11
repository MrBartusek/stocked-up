import axios, { AxiosError } from 'axios';
import { useQuery, useQueryClient } from 'react-query';
import { PrivateUserDto } from 'shared-types';

export interface UseUserType {
	isLoading: boolean;
	isAuthenticated: boolean;
	invalidateUser: () => Promise<void>;
	logout: () => Promise<void>;
	user: PrivateUserDto;
}

function useUser(): UseUserType {
	const queryClient = useQueryClient();

	const fetchUser = async () => {
		const { data } = await axios.get(`/api/users/me`);
		return data as PrivateUserDto;
	};

	const { data, error, isLoading, refetch } = useQuery(['users', 'me'], fetchUser, {
		retry(failureCount: number, error: AxiosError) {
			if (error?.response?.status == 403) return false;
			return failureCount < 1;
		},
		refetchInterval: 60 * 1000,
		refetchOnWindowFocus: false,
	});

	async function invalidateUser() {
		queryClient.clear();
		await refetch();
	}

	async function logout(): Promise<void> {
		await axios.post('/api/auth/logout');
		return invalidateUser();
	}

	return {
		isLoading: isLoading,
		isAuthenticated: data != undefined && !error,
		invalidateUser,
		logout,
		user: data as PrivateUserDto,
	};
}

export default useUser;
