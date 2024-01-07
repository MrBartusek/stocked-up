import axios, { AxiosError } from 'axios';
import { useState } from 'react';
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
	const [stale, setStale] = useState(false);
	const queryClient = useQueryClient();

	const fetchUser = async () => {
		const { data } = await axios.get(`/api/users/me`);
		return data as PrivateUserDto;
	};

	const { data, error, isLoading } = useQuery(['users', 'me'], fetchUser, {
		retry(failureCount: number, error: AxiosError) {
			if (error?.response?.status == 403) return false;
			return failureCount < 1;
		},
		onSuccess() {
			setStale(false);
		},
		refetchInterval: 60 * 1000,
		refetchOnWindowFocus: false,
	});

	async function invalidateUser() {
		queryClient.clear();
		setStale(true);
	}

	async function logout(): Promise<void> {
		await axios.post('/api/auth/logout');
		return invalidateUser();
	}

	return {
		isLoading: isLoading,
		isAuthenticated: data != undefined && !error && !stale,
		invalidateUser,
		logout,
		user: data as PrivateUserDto,
	};
}

export default useUser;
